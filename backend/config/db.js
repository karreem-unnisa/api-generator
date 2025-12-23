import mysql from "mysql2/promise";

let pool;

export async function connectDB() {
  try {
    pool = mysql.createPool({
      uri: process.env.MYSQL_URL,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    console.log("MySQL Pool Connected");
  } catch (error) {
    console.error("DB Connection Failed", error);
    process.exit(1);
  }
}

export function getDB() {
  return pool;
}
