import userService from '../service/UserService';
const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}

const handleUserPage = async (req, res) => {
    // cookies that have not been signed
    // console.log('Cookies: ', req.cookies);
    // console.log('signCookies: ', req.signedCookies);
    let userList = await userService.getUserList();
    return res.render("user.ejs", { userList });

}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;
    userService.createNewUser(email, password, username)
    return res.redirect("/user");
}

const handleDeleteUser = (req, res) => {
    userService.deleteUser(req.params.id);
    return res.redirect("/user");
}

const getUpdateUserPage = async (req, res) => {
    let user = await userService.getUserById(req.params.id);
    let userData = {};
    userData = user;
    // console.log("check userdata: ", userData)
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

    await userService.updateUserInformation(email, username, id);
    return res.redirect("/user");
}

module.exports = {
    handleHelloWorld, handleUserPage, handleCreateNewUser, handleDeleteUser, getUpdateUserPage, handleUpdateUser
}