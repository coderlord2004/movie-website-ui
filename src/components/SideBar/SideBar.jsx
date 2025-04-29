import { useState, memo } from "react";
import { useNotification } from "../../context/NotificationContext.jsx";
import styles from './SideBar.module.css';
import { cinemaMenu, linkIcon, userActivitiesMenu } from '../../constants/menu';
import { FaAngleRight, FaAngleDown, FaPhotoFilm } from "react-icons/fa6";
import { MdMovieFilter } from "react-icons/md";

function SideBar({ onUpdateActiveMenu }) {
    const [activeMenu, setActiveMenu] = useState('HotMoviesAndFree');
    const [isCinemaOpen, setCinemaOpen] = useState(true);
    const { showNotification } = useNotification();

    const handleMenuClick = (tab) => {
        setActiveMenu(tab);
        onUpdateActiveMenu(tab);
    };

    return (
        <div className={`${styles.sideBar} w-[230px] h-full bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] fixed top-[50px]  z-50 shadow-lg flex flex-col py-4 px-2 overflow-y-auto left-[-100%] sm:left-0`}>

            {/* Hot movies and Free */}
            <div
                className="w-full py-3 px-4 mb-4 bg-gray-800 rounded-lg cursor-pointer flex justify-center items-center hover:bg-gray-700 transition-all"
                onClick={() => handleMenuClick('HotMoviesAndFree')}
            >
                <div
                    className={`flex items-center gap-3 font-semibold select-none transition-all ${activeMenu === 'HotMoviesAndFree' ? 'text-yellow-400' : 'text-white'}`}
                >
                    <MdMovieFilter style={{
                        fontSize: '25px'
                    }} />
                    <p>Hot Movies & Free</p>
                </div>
            </div>

            {/* Theatrical Movies */}
            <div className="mb-6">
                <div
                    className="flex justify-between items-center pl-[16px] pr-[8px] py-2 cursor-pointer hover:bg-gray-700 rounded-lg transition-all bg-gray-800"
                    onClick={() => setCinemaOpen(!isCinemaOpen)}
                >
                    <div className="flex items-center gap-3">
                        <FaPhotoFilm style={{
                            fontSize: '25px',
                            color: 'white'
                        }} />
                        <h1 className="text-white font-semibold select-none">Theatrical Movies</h1>
                    </div>
                    {isCinemaOpen ? <FaAngleDown className="text-white" /> : <FaAngleRight className="text-white" />}
                </div>

                <div className={`flex flex-col ml-6 pl-2 border-l border-gray-600 overflow-hidden transition-all ${isCinemaOpen ? 'max-h-[500px]' : 'max-h-0'} duration-300 ease-in-out`}>
                    {cinemaMenu.map((tab) => (
                        <div
                            key={tab}
                            className="flex items-center gap-2 py-2 px-2 cursor-pointer rounded-lg hover:bg-gray-700 transition-all"
                            onClick={() => handleMenuClick(tab)}
                        >
                            <img
                                src={linkIcon[tab]}
                                alt={tab}
                                className="w-5 h-5"
                            />
                            <p className={`text-sm select-none ${activeMenu === tab ? 'text-yellow-400' : 'text-gray-300'}`}>
                                {tab}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* User Activities */}
            <div className="flex flex-col gap-2">
                {userActivitiesMenu.map((tab) => (
                    <div
                        key={tab}
                        className="flex items-center gap-3 py-2 px-4 cursor-pointer rounded-lg hover:bg-gray-700 transition-all"
                        onClick={() => handleMenuClick(tab)}
                    >
                        <img
                            src={linkIcon[tab]}
                            alt={tab}
                            className="w-6 h-6"
                        />
                        <p className={`text-base select-none ${activeMenu === tab ? 'text-yellow-400' : 'text-gray-300'}`}>
                            {tab}
                        </p>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default memo(SideBar);
