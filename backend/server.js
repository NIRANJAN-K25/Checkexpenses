const env = require('./src/config/env');
const connectDB = require('./src/config/db');
const app = require('./src/app');

connectDB().then(() => app.listen(env.port, () => console.log(`checkexprense running on http://localhost:${env.port}`)))
  .catch(e => { console.error('MongoDB connection failed:', e.message); process.exit(1); });
