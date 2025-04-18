import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";

//https://api.cloudinary.com/v1_1/${cloudName}/upload
function UploadFilm() {
    const [formData, setFormData] = useState({
        adult: false,
        backdrop_path: null,
        poster_path: null,
        video_path: null,
        genres: '',
        title: '',
        overview: ''
    });

    const [previewImages, setPreviewImages] = useState({
        backdrop_path: null,
        poster_path: null,
        video_path: null
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0]
        });

        if (files && files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewImages({
                    ...previewImages,
                    [name]: event.target.result
                });
            };
            reader.readAsDataURL(files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dp1h9ryai'
        }
    });

    // cld.image returns a CloudinaryImage with the configuration set.
    const myImage = cld.image('images_knfdnm');

    // The URL of the image is: https://res.cloudinary.com/dp1h9ryai/image/upload/sample

    // Render the image in a React component.

    useEffect(() => {

    }, [])

    const uploadImage = () => {
        const form = new FormData()
        form.append('file', formData.backdrop_path)
        console.log('form = ', form);
        fetch(`https://api.cloudinary.com/v1_1/dp1h9ryai/image/upload?api_key=787328811916441&upload_preset=unsigned_1`, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => console.log('data: ', data))
            .catch(err => console.log('err: ', err))
    }
    return (
        <div className="w-auto h-auto">
            <Header
                onSearching={() => { }}
                onReset={() => { }}
            />
            <div className="w-full max-w-md mx-auto mt-[50px] p-5 bg-gray-800 text-white rounded-lg">
                <h1 className="text-2xl font-bold mb-5 text-center">Upload Film</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <AdvancedImage cldImg={myImage} />
                        <label className="block mb-2 cursor-pointer" htmlFor='adult'>
                            <input
                                id="adult"
                                type="checkbox"
                                name="adult"
                                checked={formData.adult}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Adult
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Backdrop Path</label>
                        <input
                            type="file"
                            name="backdrop_path"
                            onChange={handleFileChange}
                            className="w-full p-2 bg-gray-700 rounded cursor-pointer"
                            required
                        />
                        {previewImages.backdrop_path && (
                            <img src={previewImages.backdrop_path} alt="Backdrop Preview" className="mt-2 w-full h-auto rounded" />
                        )}
                        <button onClick={uploadImage}>upload</button>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Poster Path</label>
                        <input
                            type="file"
                            name="poster_path"
                            onChange={handleFileChange}
                            className="w-full p-2 bg-gray-700 rounded cursor-pointer"
                            required
                        />
                        {previewImages.poster_path && (
                            <img src={previewImages.poster_path} alt="Poster Preview" className="mt-2 w-full h-auto rounded" />
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Video Path</label>
                        <input
                            type="file"
                            name="video_path"
                            onChange={handleFileChange}
                            className="w-full p-2 bg-gray-700 rounded cursor-pointer"
                            required
                        />
                        {previewImages.video_path && (
                            <video controls className="mt-2 w-full h-auto rounded">
                                <source src={previewImages.video_path} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Genres</label>
                        <select
                            name="genres"
                            value={formData.genres}
                            onChange={handleChange}
                            className="w-full p-2 bg-gray-700 rounded cursor-pointer"
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
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-2 bg-gray-700 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Overview</label>
                        <textarea
                            name="overview"
                            value={formData.overview}
                            onChange={handleChange}
                            className="w-full p-2 bg-gray-700 rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-2 bg-blue-600 rounded hover:bg-blue-700"
                    >
                        Upload Film
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UploadFilm;