import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import db from '../models/index';
import { where } from 'sequelize/lib/sequelize';

// get the promise implementation, we will use bluebird

// create the connection, specify bluebird as Promise




const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
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

const getUserList = async () => {

    let newUser = await db.User.findOne({
        where: { id: 1 },
        attributes: ["id", "username", "email"],
        include: { model: db.Group, attributes: ["id", "name", "description"] },
        raw: true,
        nest: true
    })

    let roles = await db.Group.findOne({
        where: { id: 1 },
        include: { model: db.Role },
        raw: true,
        nest: true
    })
    // console.log("check new user ", newUser);
    // console.log("check new role ", roles);


    let users = [];
    users = await db.User.findAll();
    return users;
    //const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });

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


const updateUserInformation = async (email, username, id) => {
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
    createNewUser, getUserList, deleteUser, getUserById, updateUserInformation
}