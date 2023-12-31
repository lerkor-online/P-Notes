const { Users } = require("../db");

const postUser = async (req, res) => {
    const { name, email, password } = req.body;
    console.log({name, email, password})
    if(!name || !email || !password) {
        return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }
    try {
        const user = await Users.create({ name, email, password });
        res.status(200).json(user);     
    } catch (error) {
        return res.status(500).json({ message: `Hubo un error al procesar la solicitud. ${error} ` });        
    }
}

module.exports = postUser;