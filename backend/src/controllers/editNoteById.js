const { Notes, Categories } = require("../db");

const editNote = async (req, res) => {
  const { idNote, title, description, order, categories } = req.body;

  // Validación de datos de entrada
  if (!title || !description) {
    return res.status(400).json({ message: "El título y la descripción son obligatorios." });
  }

  try {
    // Buscar la nota por ID
    const existingNote = await Notes.findByPk(idNote, {
      include: {
        model: Categories,
        attributes: ["id", "name"],
        through: { attributes: [] },
        as: 'Categories',
      },
    });

    if (!existingNote) {
      return res.status(404).json({ message: "Nota no encontrada." });
    }

    // Actualizar los campos básicos de la nota
    existingNote.title = title;
    existingNote.description = description;
    existingNote.order = order;

    // Actualizar las categorías asociadas a la nota
    const existingCategories = existingNote.Categories.map(category => category.name);

    // Eliminar categorías que ya no están presentes
    const categoriesToRemove = existingCategories.filter(category => !categories.includes(category));

    // Obtener los modelos de las categorías a eliminar
    const categoriesToRemoveModels = await Categories.findAll({
      where: { name: categoriesToRemove },
    });

    // Eliminar las relaciones con las categorías a eliminar
    await existingNote.removeCategories(categoriesToRemoveModels);

    // Agregar nuevas categorías
    const categoriesToAdd = categories.filter(category => !existingCategories.includes(category));
    
    // Obtener los modelos de las nuevas categorías
    const newCategories = await Categories.findAll({
      where: { name: categoriesToAdd },
    });

    // Agregar las nuevas categorías
    await existingNote.addCategories(newCategories);

    // Guardar los cambios en la base de datos
    await existingNote.save();

    // Devolver la nota actualizada
    res.status(200).json(existingNote);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Hubo un error al procesar la solicitud." });
  }
};

module.exports = editNote;

