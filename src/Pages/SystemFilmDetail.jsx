import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNotification } from '../context/NotificationContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";

const website_base_url = import.meta.env.VITE_WEBSITE_BASE_URL;

function SystemFilmDetail() {
    const { showNotification } = useNotification()
    const { systemFilmId } = useParams();
    const [systemFilmDetail, setSystemFilmDetail] = useState({
        systemFilmData: null,
        systemFilmComment: []
    })
    const [loading, setLoading] = useState(true)
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)

    useEffect(() => {
        const fetchFilmDetail = async () => {
            try {
                const options = {
                    method: 'GET',
                    credentials: 'include'
                }
                const results = await Promise.allSettled([
                    fetch(`${website_base_url}/api/system-films/${systemFilmId}/detail`, options).then(res => res.json()),
                    fetch(`${website_base_url}/api/comment/film/${systemFilmId}/comment-list`, options).then(res => res.json())
                ])

                setSystemFilmDetail({
                    systemFilmData: results[0].value.results,
                    systemFilmComment: results[1].value,
                })

                if (results[0].status === "rejected") {
                    showNotification("error", "Getting a movie detail is errored!");
                }
                if (results[1].status === "rejected") {
                    showNotification("error", "Getting movies is errored!");
                }

                setLoading(false)
            } catch (error) {
                console.error("Error fetching film data:", error)
                showNotification(error.message, 'error')
                setLoading(false)
            }
        }
        fetchFilmDetail()
    }, [systemFilmId, showNotification])

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const toggleVideoPlay = () => {
        setIsVideoPlaying(!isVideoPlaying);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (!systemFilmDetail) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <p className="text-gray-300 text-xl">Film not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <div className="relative h-[350px] w-full overflow-hidden">
                <motion.img
                    src={systemFilmDetail.systemFilmData.backdropPath}
                    alt={systemFilmDetail.systemFilmData.title}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
                <motion.button
                    onClick={toggleVideoPlay}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute top-1/3 left-1/2 transform translate-x-[-50%] hover:scale-[1.05] active:scale-[0.95] bg-purple-600 hover:bg-purple-700 rounded-full p-3 shadow-lg"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-[40px] w-[40px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </motion.button>
            </div>

            <AnimatePresence>
                {isVideoPlaying && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
                        onClick={toggleVideoPlay}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="relative w-full max-w-4xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={toggleVideoPlay}
                                className="absolute -top-12 right-0 text-gray-300 hover:text-white"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <video
                                controls
                                autoPlay
                                className="w-full rounded-lg shadow-xl"
                                src={systemFilmDetail.systemFilmData.videoPath}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="container mx-auto px-4 py-8 -mt-20 relative z-10">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex flex-col md:flex-row gap-8"
                >
                    <div className="w-full md:w-1/3 lg:w-1/4">
                        <motion.img
                            src={systemFilmDetail.systemFilmData.posterPath}
                            alt={systemFilmDetail.systemFilmData.title}
                            className="rounded-lg shadow-xl w-full h-auto"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        />
                    </div>

                    <div className="w-full md:w-2/3 lg:w-3/4">
                        <div className="flex flex-col space-y-4">
                            <motion.h1
                                className="text-4xl font-bold text-white"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                {systemFilmDetail.systemFilmData.title}
                                {systemFilmDetail.systemFilmData.adult && (
                                    <span className="ml-2 bg-red-500 text-xs px-2 py-1 rounded-md">18+</span>
                                )}
                            </motion.h1>

                            <div className="flex flex-wrap gap-2">
                                {systemFilmDetail.systemFilmData.genres.map((genre, index) => (
                                    <motion.span
                                        key={genre}
                                        className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                    >
                                        {genre}
                                    </motion.span>
                                ))}
                            </div>

                            <motion.div
                                className="flex items-center space-x-4 text-gray-400"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <span>{formatDate(systemFilmDetail.releaseDate)}</span>
                                <span>•</span>
                                <span>{systemFilmDetail.numberOfViews} views</span>
                            </motion.div>

                            <motion.div
                                className="flex space-x-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                <button className="flex items-center space-x-1 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition">
                                    <BiSolidLike />
                                    <span>{systemFilmDetail.systemFilmData.numberOfLikes}</span>
                                </button>
                                <button className="flex items-center space-x-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition">
                                    <BiSolidDislike />
                                    <span>{systemFilmDetail.systemFilmData.numberOfDislikes}</span>
                                </button>
                                <button className="flex items-center space-x-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                    </svg>
                                    <span>{systemFilmDetail.systemFilmData.numberOfComments} comments</span>
                                </button>
                            </motion.div>

                            <motion.div
                                className="mt-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                            >
                                <h2 className="text-xl font-semibold text-white mb-2">Overview</h2>
                                <p className="text-gray-300 leading-relaxed">{systemFilmDetail.overview}</p>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <h2 className="text-2xl font-bold text-white mb-6">Comments</h2>
                    <div className="space-y-6">
                        {systemFilmDetail.systemFilmComment.map(comment => (
                            <div key={comment.commentId} className="bg-gray-800 rounded-lg p-4">
                                <div className="flex items-center space-x-4">
                                    <img src={comment.avatarPath} alt={comment.username} className="w-10 h-10 rounded-full object-cover" />
                                    <div>
                                        <h4 className="font-semibold">{comment.username}</h4>
                                        <span className="text-gray-400 text-xs">{formatDate(comment.commentTime)}</span>
                                    </div>
                                </div>
                                <p className="mt-2 text-gray-300">{comment.content}</p>
                                {comment.childComments && comment.childComments.length > 0 && (
                                    <div className="ml-10 mt-4 space-y-4">
                                        {comment.childComments.map(child => (
                                            <div key={child.commentId} className="flex space-x-4">
                                                <img src={child.avatarPath} alt={child.username} className="w-8 h-8 rounded-full object-cover" />
                                                <div>
                                                    <h5 className="font-semibold text-sm">{child.username}</h5>
                                                    <span className="text-gray-400 text-xs">{formatDate(child.commentTime)}</span>
                                                    <p className="text-gray-300 text-sm mt-1">{child.content}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    className="mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                >
                    <h2 className="text-2xl font-bold text-white mb-6">Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-800 rounded-xl p-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-300 mb-2">Release Date</h3>
                            <p className="text-gray-400">{formatDate(systemFilmDetail.systemFilmData.releaseDate)}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-300 mb-2">Status</h3>
                            <p className="text-gray-400">{systemFilmDetail.systemFilmData.belongTo}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-300 mb-2">Added to System</h3>
                            <p className="text-gray-400">{formatDate(systemFilmDetail.systemFilmData.createdAt)}</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default SystemFilmDetail
