import React, { useEffect, useState } from 'react'
import MovieViewsChart from '../../components/MovieViewsChart/MovieViewsChart';
import Header from '../../components/Header/Header';
import styles from './Admin.module.css'
import Image from '../../components/Image/Image'
import Marvel1 from '../../assets/marvel1.jpg'
import Marvel2 from '../../assets/marvel2.jpg'
import SideBar from '../../components/SideBar/SideBar'
import PieChartComponent from '../../components/MovieViewsChart/PieChart';

const data = [
    { date: "01-2024", viewers: 100 },
    { date: "02-2024", viewers: 250 },
    { date: "03-2024", viewers: 180 },
    { date: "04-2024", viewers: 320 },
    { date: "05-2024", viewers: 400 },
    { date: "06-2024", viewers: 300 },
    { date: "07-2024", viewers: 400 },
    { date: "08-2024", viewers: 500 },
    { date: "09-2024", viewers: 1000 },
    { date: "11-2024", viewers: 1200 },
    { date: "12-2024", viewers: 1100 },
    { date: "1-2025", viewers: 985 },
    { date: "2-2025", viewers: 800 },
];

const newUser = [
    { date: "01-2024", users: 100 },
    { date: "02-2024", users: 250 },
    { date: "03-2024", users: 180 },
    { date: "04-2024", users: 320 },
    { date: "05-2024", users: 400 },
    { date: "06-2024", users: 300 },
    { date: "07-2024", users: 400 },
    { date: "08-2024", users: 500 },
];

const userInfors = [
    {
        "username": "john_doe",
        "email": "john.doe@example.com",
        "DOB": "1995-07-20",
        "account_created": "2023-05-15T14:30:00Z",
        "ip_address": "192.168.1.10",
        "country_flag": "us"
    },
    {
        "username": "alice_wonder",
        "email": "alice.wonder@example.com",
        "DOB": "1998-12-05",
        "account_created": "2022-11-10T09:15:00Z",
        "ip_address": "203.120.45.67",
        "country_flag": "gb"
    },
    {
        "username": "david_nguyen",
        "email": "david.nguyen@example.com",
        "DOB": "1993-03-10",
        "account_created": "2021-08-25T18:45:00Z",
        "ip_address": "101.99.32.120",
        "country_flag": "vn"
    },
    {
        "username": "sophie_martin",
        "email": "sophie.martin@example.com",
        "DOB": "1996-09-15",
        "account_created": "2024-01-01T12:00:00Z",
        "ip_address": "88.214.67.32",
        "country_flag": "fr"
    },
    {
        "username": "michael_smith",
        "email": "michael.smith@example.com",
        "DOB": "1990-06-22",
        "account_created": "2020-07-30T21:10:00Z",
        "ip_address": "176.54.32.11",
        "country_flag": "ca"
    },
    {
        "username": "emma_jones",
        "email": "emma.jones@example.com",
        "DOB": "2000-04-18",
        "account_created": "2023-09-14T08:20:00Z",
        "ip_address": "134.56.78.90",
        "country_flag": "au"
    },
    {
        "username": "ryan_kim",
        "email": "ryan.kim@example.com",
        "DOB": "1997-11-30",
        "account_created": "2022-05-05T10:40:00Z",
        "ip_address": "220.89.112.76",
        "country_flag": "kr"
    },
    {
        "username": "sofia_hernandez",
        "email": "sofia.hernandez@example.com",
        "DOB": "1994-02-28",
        "account_created": "2019-12-25T15:30:00Z",
        "ip_address": "189.23.45.67",
        "country_flag": "es"
    },
    {
        "username": "william_tan",
        "email": "william.tan@example.com",
        "DOB": "1988-08-12",
        "account_created": "2018-03-10T19:55:00Z",
        "ip_address": "55.102.34.87",
        "country_flag": "sg"
    },
    {
        "username": "lisa_muller",
        "email": "lisa.muller@example.com",
        "DOB": "1992-05-25",
        "account_created": "2021-06-18T16:05:00Z",
        "ip_address": "93.87.29.110",
        "country_flag": "de"
    }
]

function Admin() {
    const [topFilmImage, setTopFilmImage] = useState(Marvel1)
    const [animateLineChart, setAnimateLineChart] = useState(false)
    useEffect(() => {
        const handleSCroll = () => {
            const scrollValue = window.scrollY
            if (scrollValue > 140) {
                setAnimateLineChart(true)
            }
        }
        window.addEventListener('scroll', handleSCroll)

        return () => {
            window.removeEventListener('scroll', handleSCroll)
        }
    }, [])

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString("en-US", {
            weekday: "long",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour12: false,
        });
    }

    return (
        <div className="w-auto h-auto flex flex-col justify-center items-center overflow-x-hidden text-white">
            <Header />
            <SideBar onActiveMenuUpdate={() => { }} />
            <div className={'w-full sm:w-[80%] h-auto flex flex-col justify-center items-center sm:ml-[20%] px-[5px] bg-black rounded-[10px] mt-[50px]'}>
                <div className="w-full h-[300px] flex justify-center items-center gap-[10px] mt-[20px]">
                    <div className="w-[50%] h-full border-[1px] border-solid border-[#fff] rounded-[10px] flex flex-col bg-gradient-to-br from-[red] to-[blue] relative">
                        <select className="text-center mx-auto bg-black/70 text-white p-[5px] rounded-[6px] cursor-pointer absolute top-[6px] right-[6px] z-[1000]" onChange={(e) => setTopFilmImage(Marvel2)}>
                            <option value="Top view">Top film's view</option>
                            <option value="Top like">Top film's like</option>
                        </select>
                        <Image src={topFilmImage} title={"Marvel"} />
                        <div className="text-white flex">
                            <p className="">1000,000 view</p>
                            <div className="w-[2px] rounded-[10px] min-h-full bg-white mx-[10px]"></div>
                            <p className="text-[red]">200 like</p>
                            <div className="w-[2px] rounded-[10px] min-h-full bg-white mx-[10px]"></div>
                            <p className="text-[green]">20 dislike</p>
                        </div>
                    </div>
                    <div className="w-[50%] h-full flex justify-center items-center border-[1px] border-solid border-[#fff] rounded-[10px] bg-gradient-to-bl from-[red] to-[blue]">
                        <PieChartComponent />
                    </div>
                </div>
                <div className="w-full h-auto block sm:flex justify-center items-center gap-[10px] mt-[10px]">
                    <MovieViewsChart
                        title={"Total number of users watching movies on the system through the months"}
                        viewData={data}
                        obj={{
                            valueX: "date",
                            valueY: "viewers"
                        }}
                        animation={animateLineChart}
                    />
                    <MovieViewsChart title={"Total number of new users registered on the system through the months"}
                        viewData={newUser}
                        obj={{
                            valueX: "date",
                            valueY: "users"
                        }}
                        animation={animateLineChart}
                    />
                </div>
                <table className={'table-fixed w-full mt-[20px] rounded-[10px] border-collapse'}>
                    <caption className="font-bold text-[120%] mb-[10px]">User information</caption>
                    <thead className="border-b-2 border-[#fff] rounded-[10px] bg-[#2E95D3] p-[10px]">
                        <tr className='rounded-[8px]'>
                            <th className="w-[60px] rounded-tl-[8px] h-auto">Order number</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>DOB</th>
                            <th>Account Created</th>
                            <th>IP Address</th>
                            <th className="rounded-tr-[10px]">Country Flag</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userInfors ? userInfors.map(
                            (user, index) => (
                                <tr key={index} className={(index === userInfors.length - 1 ? 'rounded-b-[10px]' : '')}>
                                    <td className="text-center">{index + 1}</td>
                                    <td title={user.username}>{user.username}</td>
                                    <td title={user.email}>{user.email}</td>
                                    <td title={user.DOB} className="text-center">{user.DOB}</td>
                                    <td title={formatDate(user.account_created)}>{formatDate(user.account_created)}</td>
                                    <td title={user.ip_address} className="text-center">{user.ip_address}</td>
                                    <td title={user.country_flag.toUpperCase()} className="text-center flex justify-center items-center truncate">
                                        <span className="mx-[5px] block">{user.country_flag.toUpperCase()}</span>
                                        <img src={`https://flagcdn.com/w40/${user.country_flag.toLowerCase()}.png`} alt="error" />
                                    </td>
                                </tr>
                            )
                        ) : ('')}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Admin;