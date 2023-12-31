const { Users } = require("../db");

const getUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email, password } });
    console.log({user})
    user ? res.json({ access : true, idUser: user.id }) : res.json({ access : false });
}

module.exports = getUser;