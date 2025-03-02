from datetime import datetime
from werkzeug.utils import secure_filename
import os
from flask import jsonify, request
import razorpay
import stripe

# ... existing code ...

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Initialize payment gateways
razorpay_client = razorpay.Client(auth=("YOUR_KEY_ID", "YOUR_KEY_SECRET"))
stripe.api_key = "YOUR_STRIPE_SECRET_KEY"

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/auctions/search', methods=['GET'])
@jwt_required()
def search_auctions():
    query = request.args.get('q', '')
    category = request.args.get('category', '')
    min_price = request.args.get('min_price', 0)
    max_price = request.args.get('max_price', float('inf'))
    
    auctions = Auction.query.filter(
        Auction.title.ilike(f'%{query}%'),
        Auction.current_price >= min_price
    )
    
    if category:
        auctions = auctions.filter(Auction.category == category)
    if max_price != float('inf'):
        auctions = auctions.filter(Auction.current_price <= max_price)
        
    return jsonify([auction.to_dict() for auction in auctions.all()])

@app.route('/api/bids/<int:auction_id>', methods=['GET'])
@jwt_required()
def get_bid_history(auction_id):
    bids = Bid.query.filter_by(auction_id=auction_id).order_by(Bid.timestamp.desc()).all()
    return jsonify([bid.to_dict() for bid in bids])

@app.route('/api/users/<int:user_id>/rating', methods=['POST'])
@jwt_required()
def rate_user(user_id):
    rating = request.json.get('rating')
    comment = request.json.get('comment')
    
    if not 1 <= rating <= 5:
        return jsonify({'error': 'Rating must be between 1 and 5'}), 400
        
    new_rating = UserRating(
        user_id=user_id,
        rater_id=current_user.id,
        rating=rating,
        comment=comment
    )
    db.session.add(new_rating)
    db.session.commit()
    
    return jsonify({'message': 'Rating submitted successfully'})

@app.route('/api/auctions/<int:auction_id>/images', methods=['POST'])
@jwt_required()
def upload_auction_images(auction_id):
    if 'images' not in request.files:
        return jsonify({'error': 'No file part'}), 400
        
    files = request.files.getlist('images')
    uploaded_files = []
    
    for file in files:
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            new_filename = f"{auction_id}_{timestamp}_{filename}"
            
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], new_filename)
            file.save(file_path)
            
            # Save image info to database
            image = AuctionImage(
                auction_id=auction_id,
                filename=new_filename,
                path=file_path
            )
            db.session.add(image)
            uploaded_files.append(new_filename)
    
    db.session.commit()
    return jsonify({
        'message': 'Files uploaded successfully',
        'files': uploaded_files
    })

@app.route('/api/payment-methods', methods=['GET'])
@jwt_required()
def get_payment_methods():
    methods = PaymentMethod.query.filter_by(user_id=current_user.id).all()
    return jsonify([{
        'id': m.id,
        'type': m.method_type,
        'is_default': m.is_default,
        'details': {
            'upi_id': m.upi_id if m.method_type == 'upi' else None,
            'account_holder': m.account_holder if m.method_type == 'bank' else None,
            'bank_name': m.bank_name if m.method_type == 'bank' else None,
            'paypal_email': m.paypal_email if m.method_type == 'paypal' else None
        }
    } for m in methods])

@app.route('/api/payment-methods', methods=['POST'])
@jwt_required()
def add_payment_method():
    data = request.json
    method_type = data.get('type')
    
    new_method = PaymentMethod(
        user_id=current_user.id,
        method_type=method_type,
        is_default=data.get('is_default', False)
    )
    
    if method_type == 'upi':
        new_method.upi_id = data.get('upi_id')
    elif method_type == 'bank':
        new_method.account_holder = data.get('account_holder')
        new_method.account_number = data.get('account_number')
        new_method.ifsc_code = data.get('ifsc_code')
        new_method.bank_name = data.get('bank_name')
    elif method_type == 'paypal':
        new_method.paypal_email = data.get('paypal_email')
        
    db.session.add(new_method)
    db.session.commit()
    
    return jsonify({'message': 'Payment method added successfully'})

@app.route('/api/process-payment', methods=['POST'])
@jwt_required()
def process_payment():
    data = request.json
    amount = data.get('amount')
    auction_id = data.get('auction_id')
    payment_method_id = data.get('payment_method_id')
    
    payment_method = PaymentMethod.query.get_or_404(payment_method_id)
    
    # Create transaction record
    transaction = Transaction(
        user_id=current_user.id,
        auction_id=auction_id,
        amount=amount,
        payment_method_id=payment_method_id
    )
    
    try:
        if payment_method.method_type == 'upi':
            # Create UPI payment order
            order = razorpay_client.order.create({
                'amount': int(amount * 100),  # Amount in paise
                'currency': 'INR',
                'payment_capture': 1
            })
            transaction.transaction_id = order['id']
            
        elif payment_method.method_type == 'paypal':
            # Initialize PayPal payment
            # Add PayPal integration code here
            pass
            
        db.session.add(transaction)
        db.session.commit()
        
        return jsonify({
            'transaction_id': transaction.id,
            'payment_details': order if payment_method.method_type == 'upi' else None
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400 