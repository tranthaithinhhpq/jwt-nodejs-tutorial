import userApiService from '../service/userApiService';
import roleApiService from '../service/roleApiService';

const read = async (req, res) => {
    try {
        let data = await roleApiService.getAllRoles();
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT  // data (roles list)
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: "Server error",
            EC: -1,
            DT: ''
        });
    }
}

const create = async (req, res) => {
    try {
        let data = await roleApiService.createNewRoles(req.body)
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT  // data
        });
    } catch (error) {
        console.log("Error in getAllRoles:", error);
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: []
        });
    }

};

const update = async (req, res) => {
    try {
        // Gọi service cập nhật người dùng với dữ liệu từ req.body
        let data = await userApiService.updateUser(req.body);

        return res.status(200).json({
            EM: data.EM, // Error Message - Thông báo lỗi hoặc thành công
            EC: data.EC, // Error Code - Mã lỗi
            DT: data.DT  // Data - Dữ liệu trả về (nếu có)
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server', // Thông báo lỗi server
            EC: '-1',                // Mã lỗi hệ thống
            DT: ''                   // Không có dữ liệu
        });
    }
};
const remove = async (req, res) => {
    try {
        let data = await roleApiService.deleteRole(req.body.id);

        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT  // data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1',                // error code
            DT: ''                   // data
        });
    }
};

const getRoleByGroup = async (req, res) => {
    try {
        let id = req.params.groupId;
        let data = await roleApiService.getRoleByGroup(id);

        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT  // data
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1',                // error code
            DT: ''                   // data
        });
    }
};

const assignRoleToGroup = async (req, res) => {
    try {
        let data = await roleApiService.assignRoleToGroup(req.body.data);
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT  // data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1',                // error code
            DT: ''                   // data
        });
    }
};


module.exports = {
    read,
    create,
    update,
    remove,
    getRoleByGroup,
    assignRoleToGroup
};
