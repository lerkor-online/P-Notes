import React, { useState, useEffect } from 'react';
import axios from 'axios';

const backendURL = import.meta.env.VITE_REACT_APP_URL_BACKEND

const EditModal = ({note, onClose}) => {
    const [editedNote, setEditedNote] = useState({
        title: '',
        description: '',
        order: 0,
        categories: [],
      });

      const [allCategories, setAllCategories] = useState([]);
      const [newCategory, setNewCategory] = useState('');

      useEffect(() => {
        if (note) {
          // Si hay una nota, actualiza el estado del formulario con los datos de la nota
          setEditedNote({
            idNote: note.id,
            title: note.title,
            description: note.description,
            order: note.order,
            categories: note.Categories.map(category => category.name),
          });
        }
        getAllCategories();
      }, [note]);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedNote((prevNote) => ({
          ...prevNote,
          [name]: value,
        }));
      };

    const handleSelectCategory = (e) => {
        const selectedCategory = e.target.value;

        // Verifica si la categoría ya está en la lista
        if (!editedNote.categories.includes(selectedCategory)) {
            setEditedNote((prev) => ({
                ...prev,
                categories: [...prev.categories, selectedCategory],
            }));
        }
    }

    const getAllCategories = async () => {
        try {
            const res = await axios.get(`${backendURL}category`);
            console.log(res.data);
            setAllCategories(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddCategory = async () => {
        if (newCategory) {
            try {
                const res = await axios.post(`${backendURL}category`, { name: newCategory });
                setNewCategory('');
                getAllCategories();
            } catch (error) {
                console.log(error);
                setNewCategory('');
                alert('Error al crear la categoría');
            }
        }
    };

    const handleRemoveCategory = (index) => {
        setEditedNote((prev) => {
          const updatedCategories = [...prev.categories];
          updatedCategories.splice(index, 1);
          return {
            ...prev,
            categories: updatedCategories,
          };
        });
      };

      const handleEditNote = async (id) => {
        try {
            const res = await axios.put(`${backendURL}note`, editedNote)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }


    console.log(editedNote)
  return (
    <div className="bg-white p-6 rounded shadow-lg">
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Título:
            <input
              type="text"
              name="title"
              value={editedNote.title}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Descripción:
            <textarea
              name="description"
              value={editedNote.description}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </label>
        </div>
        <div>
        <label className="block text-sm font-medium text-gray-700">
  Categorías:
  {editedNote.categories.map((category, index) => (
    <div key={index} className="flex items-center mt-1">
      <input
        type="text"
        value={category}
        onChange={(e) => handleCategoryChange(e, index)}
        className="p-2 border rounded-md w-full"
      />
      <button
        type="button"
        onClick={() => handleRemoveCategory(index)}
        className="ml-2 bg-red-500 text-white p-2 rounded-full"
      >
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13.714285714285714" viewBox="0 0 448 512"><path fill="#ffffff" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16"/></svg>
      </button>
    </div>
  ))}
</label>

          <div className='flex flex-col gap-1'>
                <label className="block text-gray-700 text-sm font-medium">Select Category:</label>
                    <select onChange={handleSelectCategory} className='text-transform: capitalize'>
                        <option disabled>Select Category</option>
                        {allCategories?.map((cat) => (
                            <option key={cat.id} value={cat.name} >
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Create New Category:</label>
                <div className="flex justify-center items-center gap-2">
                    <input 
                        className='border rounded px-2'
                        type="text" 
                        value={newCategory} 
                        onChange={(e) => setNewCategory(e.target.value)} />
                    <button type="button" onClick={handleAddCategory}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><g fill="none" stroke-linejoin="round" stroke-width="4"><path fill="#2F88FF" stroke="#000" d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"/><path stroke="#fff" stroke-linecap="round" d="M24 16V32"/><path stroke="#fff" stroke-linecap="round" d="M16 24L32 24"/></g></svg>
                    </button>
                </div>
                </div>
        </div>
        <div className="flex justify-end space-x-2">
          <button type="submit" onClick={handleEditNote} className="bg-green-500 text-white p-2 rounded-md">
            Guardar
          </button>
          <button type="button" onClick={onClose} className="bg-red-500 text-white p-2 rounded-md">
            Cerrar
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditModal