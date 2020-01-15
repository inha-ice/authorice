const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

const { APP_PORT } = process.env;

app.listen(APP_PORT, () => {
  console.log(`shim server is running on ${APP_PORT}`);
});
