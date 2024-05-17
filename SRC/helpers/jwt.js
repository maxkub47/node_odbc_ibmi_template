const { expressjwt } = require('express-jwt');
require('dotenv').config();

module.exports = jwt;

function jwt() {
    return expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] ,userProperty:"auth"}).unless({
        path: [
            // public routes that don't require authentication
            '/login',
            '/'
        ]
    });
}