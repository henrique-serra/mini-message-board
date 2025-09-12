import 'dotenv/config';
import { Pool } from 'pg';

// All of the following properties should be read from environment variables
// We're hardcoding them here for simplicity
export default new Pool({
  host: process.env.HOST || "localhost", // or wherever the db is hosted
  user: process.env.USER || "codespace",
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432 // The default port
});

// Alternatively, you can use this:
// module.exports = new Pool({
//   connectionString: "postgresql://<role_name>:<role_password>@localhost:5432/top_users"
// });