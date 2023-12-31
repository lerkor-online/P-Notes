const { Notes, Categories, Users } = require("../db");

const postNote = async (req, res) => {
    const { title, description, order, categories, idUser } = req.body;
    console.log(title, description,  categories, idUser);

    // Validación de datos de entrada
    if (!title || !description || !categories || !idUser) {
        return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    try {
        // Buscar el usuario por ID
        const user = await Users.findByPk(idUser);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        // Crear la nota y asociarla al usuario
        const newNote = await Notes.create({
            title,
            description,
            order,
            UserId: user.id, // Asociar la nota al usuario
        });

        // Buscar las categorías por nombre
        const categoryFound = await Categories.findAll({
            where: { name: categories },
        });

        // Asociar las categorías a la nota
        await newNote.addCategories(categoryFound);

        res.status(200).json(newNote);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Hubo un error al procesar la solicitud." });
    }
};

module.exports = postNote;
