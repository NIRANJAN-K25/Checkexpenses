const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const missing = ['MONGODB_URI', 'GOOGLE_CLIENT_ID', 'JWT_SECRET'].filter(k => !process.env[k]);
if (missing.length) { console.error('Missing environment variables: ' + missing.join(', ')); process.exit(1); }
module.exports = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  jwtSecret: process.env.JWT_SECRET,
  isProd: process.env.NODE_ENV === 'production',
};
