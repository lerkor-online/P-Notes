const { Categories } = require("../db");

const deleteCategory = async (req, res) => {
    try {
        const { idCategory } = req.params;
        const category = await Categories.destroy({ where: { id: idCategory } });
        if (category) {
            return res.status(200).json(`Eliminado correctamente`);
        }
        return res.status(404).json(`No se encontro la categoria`);
    } catch (error) {
        return res.status(500).json({ message: `Hubo un error al procesar la solicitud. ${error} ` });
    }
}

module.exports = deleteCategory