import userService from '../service/UserService';
const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}

const handleUserPage = async (req, res) => {

    let userlist = await userService.getUserlist();
    return res.render("user.ejs", { userlist });

}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;
    userService.createNewUser(email, password, username)
    return res.redirect("/user");
}

const handleDeleteUser = (req, res) => {
    console.log("check id: ", req.params.id);
    userService.deleteUser(req.params.id);
    return res.redirect("/user");
}

const getUpdateUserPage = async (req, res) => {
    let user = await userService.getUserById(req.params.id);
    let userData = {};
    userData = user;
    console.log("check userdata: ", userData)
    // if (user && user.length > 0) {
    //     userData = user[0];
    // }
    //console.log("check user: ", user, " and ", user[0], "and 2", userData);
    return res.render("user-update.ejs", { userData });
}


const handleUpdateUser = async (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let id = req.body.id;
    console.log(">>> check body: ", req.body);
    await userService.updateUserInfor(email, username, id);
    return res.redirect("/user");
}

module.exports = {
    handleHelloWorld, handleUserPage, handleCreateNewUser, handleDeleteUser, getUpdateUserPage, handleUpdateUser
}