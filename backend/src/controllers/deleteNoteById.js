const { Notes } = require("../db");

const deleteNoteById = async (req, res) => {
    try {    
        const { idNote } = req.params;
        const note = await Notes.destroy({ where: { id: idNote } })
        if(note) {
            return res.status(200).json(`Eliminado correctamente`)
        }
        return res.status(404).json(`No se encontro la nota`)
    } catch (error) {
        return res.status(500).json({ message: `Hubo un error al procesar la solicitud. ${error} ` });        
    }
}

module.exports = deleteNoteById;