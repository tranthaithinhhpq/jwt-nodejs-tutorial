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


module.exports = {
    handleHelloWorld, handleUserPage, handleCreateNewUser, handleDeleteUser
}