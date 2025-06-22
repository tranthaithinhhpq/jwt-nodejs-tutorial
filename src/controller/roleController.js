import userApiService from '../service/userApiService';
import roleApiService from '../service/roleApiService';

const read = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            // Lấy thông tin phân trang từ query
            let page = req.query.page;
            let limit = req.query.limit;

            // Gọi API để lấy danh sách người dùng có phân trang
            let data = await userApiService.getUserWithPagination(+page, +limit);

            return res.status(200).json({
                EM: data.EM, // Error Message
                EC: data.EC, // Error Code
                DT: data.DT  // Data
            });
        } else {
            // Gọi API để lấy toàn bộ người dùng (không phân trang)
            let data = await userApiService.getAllUser();

            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            });
        }
    } catch (e) {
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
        // Validate & gọi service để tạo role mới
        let data = await roleApiService.createNewRoles(req.body);

        return res.status(200).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT  // Data Trả Về
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server create role', // Thông báo lỗi
            EC: '-1',                // Mã lỗi
            DT: ''                   // Không có dữ liệu
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
        let data = await userApiService.deleteUser(req.body.id);

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
    remove
};
