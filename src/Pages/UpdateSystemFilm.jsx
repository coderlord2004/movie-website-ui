import React, { useState } from 'react';
import Header from '../components/Header/Header'
import { IoIosAddCircleOutline } from "react-icons/io";
import PulseAnimation from '../components/LoadingAnimation/PulseAnimation/PulseAnimation';
import { useParams } from 'react-router-dom';

const website_base_url = import.meta.env.VITE_WEBSITE_BASE_URL;

function UpdateSystemFilm() {
    const { systemFilmId } = useParams()

    const [formData, setFormData] = useState({
        adult: false,
        title: '',
        overview: '',
        releaseDate: '',
        backdrop: null,
        poster: null,
        video: null,
        genres: [],
    });

    const [previewImages, setPreviewImages] = useState({
        backdrop: null,
        poster: null,
        video: null
    });

    const [loading, setLoading] = useState(false);
    const [genreSelection, setGenreSelection] = useState(['']);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        console.log('name: ', name, 'value: ', value, 'type: ', type, 'checked: ', checked);
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleGenreChange = (e, index) => {
        const { value } = e.target;
        const newGenres = [...formData.genres];
        newGenres[index] = value;
        setFormData(prev => ({
            ...prev,
            genres: newGenres
        }));

        const newGenreSelection = [...genreSelection];
        newGenreSelection[index] = value;
        setGenreSelection(newGenreSelection);
    };

    const handleAddGenreSelect = () => {
        setGenreSelection(prev => [...prev, '']);
        setFormData(prev => ({
            ...prev,
            genres: [...prev.genres, '']
        }));
    };

    const handleRemoveGenreSelect = (index) => {
        const newGenreSelection = genreSelection.filter((_, idx) => idx !== index);
        setGenreSelection(newGenreSelection);

        const newGenres = formData.genres.filter((_, idx) => idx !== index);
        setFormData(prev => ({
            ...prev,
            genres: newGenres
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files[0]
        }));

        if (files && files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewImages(prev => ({
                    ...prev,
                    [name]: event.target.result
                }));
            };
            reader.readAsDataURL(files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const form = new FormData(e.target);
        fetch(`${website_base_url}/admin/update/system-film/${systemFilmId}`, {
            method: "POST",
            body: form,
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => console.log('data: ', data))
            .catch(err => console.log('err: ', err))
            .finally(() => setLoading(false));

    };

    return (
        <div className="min-h-screen bg-[#1F1F1F] text-gray-300 py-10">
            <Header
                onSearching={() => { }}
                onReset={() => { }}
            />
            <div className="w-full max-w-[600px] mx-auto mt-10 p-8 bg-[#2D2D2D] rounded-[10px] shadow-lg">
                <h1 className="text-3xl font-bold mb-8 text-center text-white">Update Film</h1>
                <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">

                    {/* Checkbox */}
                    <div className="flex items-center">
                        <input
                            id="adult"
                            type="checkbox"
                            name="adult"
                            checked={formData.adult}
                            onChange={handleChange}
                            className="h-5 w-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer mb-4"
                            required
                        />
                        <label htmlFor="adult" className="ml-3 text-lg cursor-pointer mb-4">Adult</label>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block mb-2 text-lg font-semibold">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-3 bg-[#3B3B3B] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        />
                    </div>

                    {/* Overview */}
                    <div>
                        <label className="block mb-2 text-lg font-semibold">Overview</label>
                        <textarea
                            name="overview"
                            value={formData.overview}
                            onChange={handleChange}
                            className="w-full p-3 bg-[#3B3B3B] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition min-h-[100px]"
                            required
                        />
                    </div>

                    {/* Release Date */}
                    <div>
                        <label className="block mb-2 text-lg font-semibold">Release Date</label>
                        <input
                            type="datetime-local"
                            name="releaseDate"
                            value={formData.releaseDate}
                            onChange={handleChange}
                            className="w-full p-3 bg-[#3B3B3B] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        />
                    </div>

                    {/* Backdrop */}
                    <div>
                        <label className="block mb-2 text-lg font-semibold">Backdrop Image</label>
                        <input
                            type="file"
                            name="backdrop"
                            onChange={handleFileChange}
                            className="w-full p-3 bg-[#3B3B3B] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition"
                            required
                        />
                        {previewImages.backdrop && (
                            <img src={previewImages.backdrop} alt="Backdrop Preview" className="mt-3 rounded-lg" />
                        )}
                    </div>

                    {/* Poster */}
                    <div>
                        <label className="block mb-2 text-lg font-semibold">Poster Image</label>
                        <input
                            type="file"
                            name="poster"
                            onChange={handleFileChange}
                            className="w-full p-3 bg-[#3B3B3B] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition"
                            required
                        />
                        {previewImages.poster && (
                            <img src={previewImages.poster} alt="Poster Preview" className="mt-3 rounded-lg" />
                        )}
                    </div>

                    {/* Video */}
                    <div>
                        <label className="block mb-2 text-lg font-semibold">Video</label>
                        <input
                            type="file"
                            name="video"
                            onChange={handleFileChange}
                            className="w-full p-3 bg-[#3B3B3B] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition"
                            required
                        />
                        {previewImages.video && (
                            <video controls className="mt-3 w-full rounded-lg">
                                <source src={previewImages.video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>

                    {/* Genres */}
                    <div>
                        <label className="block mb-2 text-lg font-semibold">Genres</label>
                        {genreSelection.map((ele, index) => (
                            <div key={index} className="flex items-center gap-2 mb-2">
                                <select
                                    name={`genres`}
                                    value={formData.genres[index] || ''}
                                    onChange={(e) => handleGenreChange(e, index)}
                                    className="flex-1 p-3 bg-[#3B3B3B] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
                                    required
                                >
                                    <option value="">Select Genre</option>
                                    <option value="action">Action</option>
                                    <option value="comedy">Comedy</option>
                                    <option value="drama">Drama</option>
                                    <option value="fantasy">Fantasy</option>
                                    <option value="horror">Horror</option>
                                    <option value="romance">Romance</option>
                                    <option value="sci-fi">Sci-Fi</option>
                                    <option value="thriller">Thriller</option>
                                </select>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveGenreSelect(index)}
                                    className="text-red-500 hover:text-red-700 text-[150%]"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                        <IoIosAddCircleOutline
                            style={{
                                fontSize: '30px',
                                cursor: 'pointer',
                                color: 'white'
                            }}
                            onClick={handleAddGenreSelect}
                            className="mt-2"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="m-auto w-[150px] min-h-[40px] p-3 bg-blue-600 hover:bg-blue-700 rounded-[10px] text-lg font-semibold transition relative"
                    >
                        {loading ? <PulseAnimation onLoading={true} /> : 'Upload'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateSystemFilm;
