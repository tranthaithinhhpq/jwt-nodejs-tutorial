import userService from '../service/UserService';
const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}

const handleUserPage = async (req, res) => {

    let userlist = await userService.getUserlist();
    // console.log("check asdfasdfgvasfg: ", userlist.email)
    return res.render("user.ejs", { userlist });

}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    // userService.createNewUser(email, password, username)


    return res.send("new user");
}


module.exports = {
    handleHelloWorld, handleUserPage, handleCreateNewUser
}