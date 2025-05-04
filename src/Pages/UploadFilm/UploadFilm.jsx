import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Header from '../../components/Header/Header';
import { IoIosAddCircleOutline } from "react-icons/io";
import PulseAnimation from '../../components/LoadingAnimation/PulseAnimation/PulseAnimation';
import { useNotification } from '../../context/NotificationContext'
import Cropper from 'react-easy-crop';
import Modal from 'react-modal';
import getCroppedImg from '../../utils/cropImage';

const website_base_url = import.meta.env.VITE_WEBSITE_BASE_URL;
const aspectRatios = {
    backdrop: [
        { label: 'Original', value: null },
        { label: '16:9', value: 16 / 9 },
        { label: '4:3', value: 4 / 3 },
        { label: '3:2', value: 3 / 2 },
    ],
    poster: [
        { label: 'Original', value: null },
        { label: '2:3', value: 2 / 3 },
        { label: '3:4', value: 3 / 4 },
        { label: '9:16', value: 9 / 16 },
    ]
};

function UploadFilm() {
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
    const { showNotification } = useNotification()

    const [cropModal, setCropModal] = useState({
        open: false,
        type: null,
        image: null
    });
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    console.log('crop: ', crop);
    console.log('zoom: ', zoom);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [aspect, setAspect] = useState(null);

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

    const onCropComplete = (_, croppedPixels) => {
        setCroppedAreaPixels(croppedPixels);
    };

    const showCropModal = (type, image) => {
        // Tạo một Image object để lấy tỉ lệ gốc
        const img = new Image();
        img.src = image;

        img.onload = () => {
            const originalAspect = img.width / img.height;

            setAspect(originalAspect); // Set tỉ lệ ban đầu là tỉ lệ gốc
            setCropModal({ open: true, type, image, originalAspect });
        };
    };

    const handleCropDone = async () => {
        try {
            const croppedImage = await getCroppedImg(cropModal.image, croppedAreaPixels);
            setPreviewImages(prev => ({
                ...prev,
                [cropModal.type]: croppedImage
            }));
            setFormData(prev => ({
                ...prev,
                [cropModal.type]: dataURLtoFile(croppedImage, `${cropModal.type}.jpg`)
            }));
            setCropModal({ open: false, type: null, image: null });
        } catch (error) {
            showNotification("error", error);
        }
    };

    const dataURLtoFile = (dataUrl, filename) => {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            if (name === 'video') {
                const videoUrl = URL.createObjectURL(files[0]);
                setPreviewImages(prev => ({
                    ...prev,
                    video: videoUrl
                }));
                setFormData(prev => ({
                    ...prev,
                    video: files[0]
                }));
            } else {
                const reader = new FileReader();
                reader.onload = (event) => {
                    showCropModal(name, event.target.result);
                };
                reader.readAsDataURL(files[0]);
            }
        }
        e.target.value = '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const form = new FormData(e.target);
        fetch(`${website_base_url}/admin/upload/system-film`, {
            method: "POST",
            body: form,
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => showNotification('success', data.message))
            .catch(err => showNotification('error', err.message))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        return () => {
            if (previewImages.video) {
                URL.revokeObjectURL(previewImages.video);
            }
        };
    }, [previewImages.video]);

    return (
        <div className="min-h-screen bg-[#1F1F1F] text-gray-300 py-10">
            <Header
                onSearching={() => { }}
                onReset={() => { }}
            />
            <div className="w-full max-w-[600px] mx-auto mt-10 p-8 bg-[#2D2D2D] rounded-[10px] shadow-lg">
                <h1 className="text-3xl font-bold mb-8 text-center text-white">Upload Film</h1>
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
                            <video
                                controls
                                className="mt-3 w-full rounded-lg max-h-[300px]"
                                src={previewImages.video}
                            />
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

            {cropModal.open &&
                ReactDOM.createPortal(
                    <div
                        key={cropModal.image}
                        className="fixed top-[10px] right-0 left-0 bottom-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-70 p-[20px]"
                    >
                        <div className="bg-[#2D2D2D] p-4 rounded-lg max-w-4xl w-full flex flex-col">
                            <h2 className="text-white text-xl mb-4">Crop {cropModal.type}</h2>

                            {/* Aspect ratio selection */}
                            <div className="flex gap-2 mb-4">
                                {aspectRatios[cropModal.type].map((ratio) => (
                                    <button
                                        key={ratio.label}
                                        onClick={() => setAspect(ratio.label === 'Original' ? cropModal.originalAspect : ratio.value)}
                                        className={`px-3 py-1 rounded ${(ratio.label === 'Original' && aspect === cropModal.originalAspect) ||
                                            (ratio.value === aspect) ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'
                                            }`}
                                    >
                                        {ratio.label}
                                    </button>
                                ))}
                            </div>

                            {/* Cropper container with fixed height */}
                            <div className="relative w-full" style={{ height: '60vh' }}>
                                <Cropper
                                    image={cropModal.image}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={aspect}
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    onCropComplete={onCropComplete}
                                    classes={{ containerClassName: 'cropper-container' }}
                                />
                            </div>

                            {/* Zoom controls */}
                            <div className="mt-4 cursor-grabbing">
                                <label className="text-white block mb-2">Zoom</label>
                                <input
                                    type="range"
                                    value={zoom}
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    onChange={(e) => setZoom(e.target.value)}
                                    className="w-full"
                                />
                            </div>

                            <div className="flex justify-end mt-4 gap-2">
                                <button
                                    onClick={() => setCropModal({ open: false, type: null, image: null })}
                                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCropDone}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Crop
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}

        </div>
    );
}

export default UploadFilm;
