import bcrypt from 'bcryptjs';
import mysql from 'mysql2';
const salt = bcrypt.genSaltSync(10);
// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt'
});

const hashUserPassword = (userpassword) => {
    let hashpassword = bcrypt.hashSync(userpassword, salt);
    return hashpassword;
}

const createNewUser = (email, password, username) => {
    let hashPass = hashUserPassword(password);
    // simple query
    connection.query(
        'INSERT INTO users (email,password, username) VALUES (?,?,?)', [email, hashPass, username],
        function (err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
            console.log("email ", email, "pass ", password, "username ", username);
        }
    );
}

const getUserlist = () => {
    // simple query
    connection.query(
        'SELECT * from users',
        function (err, results, fields) {
            console.log("this is results: ", results); // results contains rows returned by server
            //console.log(fields); // fields contains extra meta data about results, if available
        }
    );
}

module.exports = {
    createNewUser, getUserlist
}