#! /usr/bin/env node
import 'dotenv/config';
import { Client } from 'pg';

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    text TEXT NOT NULL,
    username VARCHAR(100) NOT NULL,
    added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

export default async function createTable() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:5432/${process.env.DATABASE}`,
    // "postgresql://<role_name>:<role_password>@localhost:5432/top_users"
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}
