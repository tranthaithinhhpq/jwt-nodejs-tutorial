import db from '../models/index';

const createNewRoles = async (roles) => {
    try {
        // Lấy tất cả role hiện tại trong DB
        let currentRoles = await db.Role.findAll({
            attributes: ['url', 'description'],
            raw: true
        });

        // Lọc ra các role chưa tồn tại trong DB
        const persists = roles.filter(({ url: url1 }) =>
            !currentRoles.some(({ url: url2 }) => url1 === url2)
        );

        // Nếu không có role mới nào để tạo
        if (persists.length === 0) {
            return {
                EM: 'Nothing to create ...',
                EC: 0,
                DT: []
            };
        }

        // Tạo các role mới
        await db.Role.bulkCreate(persists);

        return {
            EM: `Create roles succeeds: ${persists.length} roles...`,
            EC: 0,
            DT: []
        };


    } catch (error) {
        console.log("Error in createNewRoles:", error);
        return {
            EM: 'Something went wrong',
            EC: -1,
            DT: []
        };
    }
};

module.exports = {
    createNewRoles
};

