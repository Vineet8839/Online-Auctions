from flask import request, abort
from functools import wraps
import re
from datetime import datetime, timedelta
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

# Rate limiting configuration
limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

def validate_input(data):
    """Validate input data against XSS and injection attacks"""
    if not data:
        return False
        
    # Check for common XSS patterns
    xss_patterns = [
        r'<script.*?>.*?</script>',
        r'javascript:',
        r'onerror=',
        r'onload='
    ]
    
    for pattern in xss_patterns:
        if re.search(pattern, str(data), re.IGNORECASE):
            return False
    return True

def require_2fa(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.is_2fa_enabled:
            return jsonify({'error': '2FA required for this action'}), 403
        return f(*args, **kwargs)
    return decorated_function

# Apply to sensitive routes
@app.route('/api/auctions/<int:auction_id>/bid', methods=['POST'])
@jwt_required()
@require_2fa
@limiter.limit("5 per minute")  # Rate limiting for bids
def place_bid(auction_id):
    # ... existing code ... 