const { Notes, Categories } = require("../db");

const getAllNotesByUser = async (req, res) => {
    try {
        const { idUser } = req.params;
        console.log(idUser);
        const notes = await Notes.findAll({
            where: { UserId: idUser },
            include: {
                model: Categories,
                attributes: ["name"],
                through: { attributes: [] }, // Para excluir los atributos de la tabla intermedia
                as: 'Categories', // Esto es importante para que el alias coincida con el configurado en la relación
            },
        });
        res.status(200).json(notes);     
    } catch (error) {
        return res.status(500).json({ message: `Hubo un error al procesar la solicitud. ${error} ` });        
    }
}

module.exports = getAllNotesByUser;
