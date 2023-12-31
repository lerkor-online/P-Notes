import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './FormNote.css'
import Navbar from '../Navbar/Navbar'

const backendURL = import.meta.env.VITE_REACT_APP_URL_BACKEND

const FormNote = () => {

    const [note, setNote] = useState({
        title: '',
        description: '',
        categories: [],
    })

    const [newCategory, setNewCategory] = useState('');
    const [allCategories, setAllCategories] = useState([]);

    const handleChange = (e) => {
        setNote((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleNewNote = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${backendURL}note`, note);
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

    const handleSelectCategory = (e) => {
        const selectedCategory = e.target.value;

        // Verifica si la categoría ya está en la lista
        if (!note.categories.includes(selectedCategory)) {
            setNote((prev) => ({
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

    useEffect(() => {
        getAllCategories();
        const id = window.localStorage.getItem('idUser');
        console.log(id);
        setNote((prev) => ({ ...prev, idUser: id }));
    }, [])

    const handleRemoveCategory = (name) => {
        setNote((prev) => ({
            ...prev,
            categories: prev.categories.filter(category => category !== name),
        }));
    }

    console.log(allCategories)
    console.log(note)

    return (
        <div className=''>
            <Navbar/>
            <form className='form-note flex flex-col justify-center items-center px-12 py-4 gap-3 rounded-xl shadow-black shadow-2xl'>
                <h1 className="flex gap-2 text-white text-xl font-bold">New Note <svg className='transform scale-x-[-1] invert' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="#000000" d="M0 31.479a.5.5 0 0 0 .5.5h31.111a.49.49 0 0 0 .355-.148l.003-.002c.003-.003.003-.009.007-.012a.503.503 0 0 0 .107-.195c.007-.023.01-.045.014-.069c.004-.025.015-.047.015-.073c0-.04-.014-.075-.023-.112c-.003-.014.003-.028-.002-.042l-3.16-9.715a.488.488 0 0 0-.122-.199L11.688 4.294c-.018-.028-.031-.058-.055-.083L7.894.472a1.56 1.56 0 0 0-2.203 0L.456 5.707C.162 6.001 0 6.392 0 6.808s.162.808.456 1.102l3.656 3.656c.018.027.03.058.054.082l17.09 17.205a.49.49 0 0 0 .212.127l6.713 2H.5a.499.499 0 0 0-.5.499m6.362-21.318l15.687 15.486l-.577 2.002L5.227 11.296zM22.816 25L7.068 9.455l2.437-2.437l15.607 15.648V25zm2.919-3.125L10.212 6.311l1.039-1.039l16.211 16.211zM22.988 26h2.624a.5.5 0 0 0 .5-.5v-2.685l2.007-.456l2.723 8.37l-8.488-2.529zM1 6.808c0-.149.058-.288.163-.394l5.235-5.235a.559.559 0 0 1 .789 0l3.372 3.372l-6.023 6.023l-3.372-3.372A.55.55 0 0 1 1 6.808"/></svg></h1>

                <div className="input-box">
                    <input type="text" placeholder="Title..."
                        onChange={handleChange}
                        id="title"
                        value={note.title}
                        required />
                </div>

                <div className="mb-4 w-full flex flex-col justify-center items-center gap-2">
                    <label className="block text-white text-sm font-bold" htmlFor="description">
                        Description:
                    </label>
                    <textarea
                        className="border rounded w-full py-2 px-3 text-gray-700"
                        type="text"
                        placeholder="Description..."
                        onChange={handleChange}
                        id="description"
                        value={note.description}
                        required
                    />
                </div>

                <div className='flex flex-col gap-1'>
                <label className="block text-white text-sm font-bold">Select Category:</label>
                    <select onChange={handleSelectCategory} className='text-transform: capitalize'>
                        <option disabled>Select Category</option>
                        {allCategories?.map((cat) => (
                            <option key={cat.id} value={cat.name} >
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='flex flex-wrap'>
                {note.categories.map((category, index) => (
                    <div key={index} className="bg-blue-700 text-white m-1 px-3 py-1 rounded-full text-center flex justify-between gap-2">
                        <button>{category}</button>
                        <button onClick={() => handleRemoveCategory(category)}>X </button>
                    </div>
                ))}
                </div>

                <div>
                <label className="block text-white text-sm mb-2">Create New Category:</label>
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


                <button type='button' className='btn bg-slate-50 text-black' onClick={handleNewNote}>Create Note</button>
            </form>
        </div>
    )
}

export default FormNote