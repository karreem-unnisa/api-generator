import mysql from "mysql2/promise";

let connection;

export async function connectDB() {
  try {
    connection = await mysql.createConnection(process.env.MYSQL_URL);
    console.log("MySQL Connected");
  } catch (error) {
    console.error("DB Connection Failed", error);
    process.exit(1);
  }
}

export function getDB() {
  return connection;
}
