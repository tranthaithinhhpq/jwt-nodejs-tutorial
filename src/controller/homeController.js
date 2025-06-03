// get the client
import mysql from 'mysql2';

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt'
});

const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}

const handleUserPage = (req, res) => {
    return res.render("user.ejs");
}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;



    // simple query
    connection.query(
        'INSERT INTO users (email,password, username) VALUES (?,?,?)', [email, password, username],
        function (err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
            console.log("email ", email, "pass ", password, "username ", username);
        }
    );

    return res.send("new user");
}


module.exports = {
    handleHelloWorld, handleUserPage, handleCreateNewUser
}