const { Categories } = require("../db");

const getAllCategories = async (req, res) => {
    try {
        const categories = await Categories.findAll();
        res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ message: `Hubo un error al procesar la solicitud. ${error} ` });
    }
}

module.exports = getAllCategories;