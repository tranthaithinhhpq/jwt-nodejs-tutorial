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

const createNewUser = async (email, password, username) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    let hashPass = hashUserPassword(password);
    // simple query
    const [rows, fields] = await connection.execute('INSERT INTO users (email,password, username) VALUES (?,?,?)', [email, hashPass, username]);


}

const getUserlist = async () => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });

    try {
        const [rows, fields] = await connection.execute('Select * from users ');
        return rows;
    } catch (error) {
        console.log(">>> check error: ", error);
    }

}

const deleteUser = async (id) => {

    // 'DELETE FROM users WHERE id=?';
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    // simple query

    try {
        const [rows, fields] = await connection.execute('DELETE FROM users WHERE id=?', [id]);
    } catch (error) {
        console.log("check error delete user: ", error);
    }

}

const getUserById = async (id) => {

    // 'DELETE FROM users WHERE id=?';
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    // simple query

    try {
        const [rows, fields] = await connection.execute('Select * FROM users WHERE id=?', [id]);
        return rows;
    } catch (error) {
        console.log("check error update user: ", error);
    }

}


const updateUserInfor = async (email, username, id) => {

    // 'DELETE FROM users WHERE id=?';
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    // simple query
    try {
        const [rows, fields] = await connection.execute('UPDATE users SET email = ?, username = ? WHERE id = ?', [email, username, id]);
        return rows;
    } catch (error) {
        console.log("check error update user: ", error);
    }

}

module.exports = {
    createNewUser, getUserlist, deleteUser, getUserById, updateUserInfor
}