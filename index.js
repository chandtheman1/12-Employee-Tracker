const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

console.log("hello");

const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    },
    console.log(`Connected to the cms_db database.`)
);