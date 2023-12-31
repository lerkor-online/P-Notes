const { Categories } = require("../db");

const postCategory = async (req, res) => {
    const { name } = req.body;
    if(!name) {
        return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }
    try {
        const category = await Categories.create({ name });
        res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({ message: `Hubo un error al procesar la solicitud. ${error} ` });
    }
}

module.exports = postCategory;