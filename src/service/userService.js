import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import db from '../models/index';
import { where } from 'sequelize/lib/sequelize';

// get the promise implementation, we will use bluebird

// create the connection, specify bluebird as Promise




const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userpassword) => {
    let hashpassword = bcrypt.hashSync(userpassword, salt);
    return hashpassword;
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password);
    try {
        await db.User.create({
            username: username,
            email: email,
            password: hashPass

        })
    } catch (error) {

    }
}

const getUserlist = async () => {
    let users = [];
    users = await db.User.findAll();
    return users;
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });

    // try {
    //     const [rows, fields] = await connection.execute('Select * from user ');
    //     return rows;
    // } catch (error) {
    //     console.log(">>> check error: ", error);
    // }

}

const deleteUser = async (userId) => {
    await db.User.destroy({
        where: { id: userId }
    })

    // // 'DELETE FROM user WHERE id=?';
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    // // simple query

    // try {
    //     const [rows, fields] = await connection.execute('DELETE FROM user WHERE id=?', [id]);
    // } catch (error) {
    //     console.log("check error delete user: ", error);
    // }

}

const getUserById = async (id) => {
    let user = {};
    user = await db.User.findOne({
        where: { id: id }
    })
    return user.get({ plain: true });

    // // 'DELETE FROM user WHERE id=?';
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    // // simple query

    // try {
    //     const [rows, fields] = await connection.execute('Select * FROM user WHERE id=?', [id]);
    //     return rows;
    // } catch (error) {
    //     console.log("check error update user: ", error);
    // }

}


const updateUserInfor = async (email, username, id) => {
    // Change everyone without a last name to "Doe"
    await db.User.update(
        { email: email, username: username },
        {
            where: {
                id: id,
            },
        },
    );

    // // 'DELETE FROM user WHERE id=?';
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    // // simple query
    // try {
    //     const [rows, fields] = await connection.execute('UPDATE user SET email = ?, username = ? WHERE id = ?', [email, username, id]);
    //     return rows;
    // } catch (error) {
    //     console.log("check error update user: ", error);
    // }

}

module.exports = {
    createNewUser, getUserlist, deleteUser, getUserById, updateUserInfor
}