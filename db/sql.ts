import sql from "mssql";
import dotenv from 'dotenv';
dotenv.config()

const sqlConfig = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    server: `${process.env.SQL_SERVER}`,
    options: {
      encrypt: false,
      trustServerCertificate: false // change to true for local dev / self-signed certs
    }
  };
// export const sqlClient=sql;
export async function query(Query:String){
    try {
       await sql.connect(sqlConfig)
       return await sql.query(`${Query}`)
    } catch (err) {
        console.log(err)
    }
}

