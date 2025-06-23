import express from "express";
import apiController from '../controller/apiController'
import userController from "../controller/userController"
import groupController from '../controller/groupController';
import { checkUserJWT, checkUserPermission } from '../middleware/JWTAction'
import roleController from '../controller/roleController';

const router = express.Router();
/**
 * 
 * @param {*} app : express app
 */



const initApiRoutes = (app) => {

    router.all('*', checkUserJWT, checkUserPermission);
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);
    router.post("/logout", apiController.handleLogout);
    router.get("/account", userController.getUserAccount);

    //user routes
    router.get('/user/read', userController.read);
    router.post("/user/create", userController.create);
    router.put("/user/update", userController.update);
    router.delete("/user/delete", userController.remove);


    // role routes
    router.get("/role/read", roleController.read);
    router.post("/role/create", roleController.create);
    router.put("/role/update", roleController.update);
    router.delete("/role/delete", roleController.remove);
    router.get("/role/by-group/:groupId", roleController.getRoleByGroup);
    router.post("/role/assign-to-group", roleController.assignRoleToGroup);

    // group routes
    router.get("/group/read", groupController.read);

    return app.use("/api/v1", router);
}
export default initApiRoutes;