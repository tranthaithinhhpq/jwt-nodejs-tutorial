const db = require('../models/index');

const getGroupWithRoles = async (user) => {
    let roles = await db.Group.findOne({
        where: { id: user.groupId },
        attributes: ["id", "name", "description"],
        include: {
            model: db.Role,
            attributes: ["id", "url", "description"],
            through: { attributes: [] }
        }
    });
    // if (!roles) {
    //     console.log("❌ Không tìm thấy group hoặc roles cho user:", user.groupId);
    // } else {
    //     console.log("✅ Tìm thấy roles:");
    //     console.log(roles);
    // }

    return roles ? roles : {};
}

module.exports = {
    getGroupWithRoles
}