import userApiService from '../service/userApiService';
const read = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            let data = await userApiService.getUserWithPagination(+page, +limit);
            return res.status(200).json({
                EM: data.EM, // error message
                EC: data.EC, //error code
                DT: data.DT, //data
            })
        } else {
            let data = await userApiService.getAllUser(+page, +limit);
            return res.status(200).json({
                EM: data.EM, // error message
                EC: data.EC, //error code
                DT: data.DT, //data
            })
        }

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from server haha',// error message
            EC: '-1', //error code
            DT: '', //data
        })

    }

}

const create = async (req, res) => {
    try {
        let data = await userApiService.createNewUser(req.body);
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, //error code
            DT: data.DT, //data
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server dumamay', // error message
            EC: '-1', //error code
            DT: '', //data
        })
    }
}

const update = async (req, res) => {
    try {
        let data = await userApiService.updateUser(req.body);
        return res.status(200).json({
            EM: 'update user success', // error message
            EC: data.EC, //error code
            DT: data.DT, //data
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1', //error code
            DT: '', //data
        })
    }

}

const remove = async (req, res) => {
    try {
        let data = await userApiService.deleteUser(req.body.id);
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, //error code
            DT: data.DT, //data
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1', //error code
            DT: '', //data
        })

    }

}

const getUserAccount = async (req, res) => {
    return res.status(200).json({
        EM: 'ok', // error message
        EC: 0,    // error code
        DT: {
            access_token: req.token,
            groupWithRoles: req.user.groupWithRoles,
            email: req.user.email,
            username: req.user.username
        }
    });
};

module.exports = { read, create, update, remove, getUserAccount }