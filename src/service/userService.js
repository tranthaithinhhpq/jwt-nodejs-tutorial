import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';

// get the promise implementation, we will use bluebird

// create the connection, specify bluebird as Promise




const salt = bcrypt.genSaltSync(10);

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

const getUserlist = async () => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    let user = [];
    // simple query
    // connection.query(
    //     'SELECT * from users',
    //     function (err, results, fields) {
    //         console.log("this is results: ", results); // results contains rows returned by server
    //         //console.log(fields); // fields contains extra meta data about results, if available
    //     }
    // );
    try {
        const [rows, fields] = await connection.execute('Select * from users ');
        return rows;
    } catch (error) {
        console.log(">>> check error: ", error);
    }

}

module.exports = {
    createNewUser, getUserlist
}