import express from "express";
import apiController from '../controller/apiController'
import userController from "../controller/userController"
const router = express.Router();
/**
 * 
 * @param {*} app : express app
 */

const initApiRoutes = (app) => {

    router.get("/test-api", apiController.testApi);
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);

    router.get("/user/read", userController.read);
    router.post("/user/create", userController.create);
    router.get("/user/update", userController.update);
    router.get("/user/remove", userController.remove);

    return app.use("/api/v1", router);
}
export default initApiRoutes;