import mysql from "mysql2/promise";

let connection;

export async function connectDB() {
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
    console.log("✅ MySQL Connected");
  } catch (error) {
    console.error("❌ DB Connection Failed", error);
    process.exit(1);
  }
}

export function getDB() {
  return connection;
}
