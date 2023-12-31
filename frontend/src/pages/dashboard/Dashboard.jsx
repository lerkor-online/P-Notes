import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../../components/Navbar/Navbar'
import EditModal from '../../components/editModal/EditModal'

const backendURL = import.meta.env.VITE_REACT_APP_URL_BACKEND

const Dashboard = () => {
    const idUser = window.localStorage.getItem('idUser')

    const [allNotes, setAllNotes] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);
    const [allCategories, setAllCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const getAllNotes = async () => {
        try {
            const res = await axios.get(`${backendURL}note/${idUser}`)
            console.log(res.data)
            setAllNotes(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllNotes()
        getAllCategories()
    }, [selectedCategories])

    const handleDeleteNote = async (id) => {
        try {
            await axios.delete(`${backendURL}note/${id}`)
            getAllNotes()
        } catch (error) {
            console.log(error)
        }
    }

    const handleOpenEditModal = (note) => {
        setCurrentNote(note);
        setIsModalVisible(true);
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

    const handleSelectCategory = (e) => {
        const selectedCategory = e.target.value;

        // Verifica si la categoría ya está en la lista
        if (!selectedCategories.includes(selectedCategory)) {
            setSelectedCategories([...selectedCategories, selectedCategory]);
        }
    }

    const handleRemoveCategory = (name) => {
        const updatedCategories = selectedCategories.filter(category => category !== name);
        setSelectedCategories(updatedCategories);
      };

      const filteredNotes = allNotes.filter((note) => {
        // Si no hay categorías seleccionadas, mostrar todas las notas
        if (selectedCategories.length === 0) {
          return true;
        }
      
        // Filtrar las notas que tienen al menos una categoría seleccionada
        return note.Categories.some(category => selectedCategories.includes(category.name));
      });

    console.log(selectedCategories)


    return (
        <div>
            <Navbar />
            <header className='flex flex-grow justify-between mt-24 items-start px-10'>

                <h1 className="text-3xl font-bold  text-slate-100">Manage your Notes</h1>
                <label className="block text-sm font-medium text-white">
                    <span className="mr-2">Filter by Category:</span>
                    <select
                        onChange={handleSelectCategory}
                        className="p-1 border rounded-md focus:outline-none focus:ring focus:border-purple-300 text-gray-700"
                    >
                        <option value="all">All</option>
                        {allCategories?.map((category, index) => (
                            <option key={index} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label>

            </header>
            <div className='flex justify-end h-10'>
                {
                    selectedCategories.map((category, index) => (
                        <div key={index}
                            className="bg-blue-700 text-white m-1 px-3 py-1 rounded-full text-center flex justify-between gap-2">
                            <button>{category}</button>
                            <button onClick={() => handleRemoveCategory(category)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#ffffff" stroke-width="1.5"><path d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z" /><path stroke-linecap="round" d="m14.5 9.5l-5 5m0-5l5 5" /></g></svg>
                            </button>
                        </div>
                    ))
                }
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-12 ">
                {
                filteredNotes.length > 0 ? 
                filteredNotes.map((note) => (
                    <div key={note.id} className="border rounded p-4 bg-[#00000065] text-white">
                        <div className="flex justify-end mb-2 gap-2">
                            <button
                                onClick={() => handleOpenEditModal(note)}
                                className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteNote(note.id)}
                                className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                        <h2 className="text-xl font-bold mb-2">{note.title}</h2>
                        <p className="mb-4">{note.description}</p>
                        <div className="flex flex-wrap">
                            {note.Categories?.map((category) => (
                                <span
                                    key={category.id}
                                    className="bg-purple-500 text-white m-1 px-2 py-1 rounded-full text-center"
                                >
                                    {category.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )) 
                : (
                    <div className='w-full h-[1200px] flex justify-center items-center'>
                <h1 className="text-center text-white font-extrabold text-3xl">No notes found.</h1>
                </div>)
            }
            </div>
            {isModalVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <EditModal
                            note={currentNote}
                            onClose={() => setIsModalVisible(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard