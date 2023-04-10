const mongoose = require('mongoose');

const token_schema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        unique_token: { type: String, required: true },
        expires_at: { type: Date, required: true },
    },
    {
        collection: 'user-auth-token'
    }
);

const auth_token = mongoose.model('auth-token', token_schema);

module.exports = auth_token;

