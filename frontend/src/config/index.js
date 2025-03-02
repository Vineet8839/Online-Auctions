const config = {
    API_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
    S3_URL: process.env.REACT_APP_S3_URL,
    STRIPE_PUBLIC_KEY: process.env.REACT_APP_STRIPE_PUBLIC_KEY
};

export default config; 