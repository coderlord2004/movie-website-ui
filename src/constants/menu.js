const sideBarMenu = ['Movie', 'TV Show', 'Trending', 'Playlist', 'Watch later']
const trendingMenu = ['All', 'Movie', 'Tv']
const movieMenu = ['Popular', 'Upcoming', 'Now playing', 'Top rated']
const tvshowMenu = ['Popular', 'Airing today', 'On The Air', 'Top rated']
const cinemaMap = {
    [sideBarMenu[0]]: movieMenu,
    [sideBarMenu[1]]: tvshowMenu,
    [sideBarMenu[2]]: trendingMenu
}
const linkIcon = {
    [sideBarMenu[2]]: 'https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/FFFFFF/external-trending-content-creator-tanah-basah-basic-outline-tanah-basah.png',
    [sideBarMenu[0]]: 'https://img.icons8.com/ios-filled/50/FFFFFF/movie.png',
    [sideBarMenu[1]]: 'https://img.icons8.com/ios-filled/50/FFFFFF/tv.png',
    [sideBarMenu[3]]: 'https://img.icons8.com/ios-filled/50/FFFFFF/video-playlist.png',
    [sideBarMenu[4]]: 'https://img.icons8.com/ios-filled/50/FFFFFF/repeat.png',
}
export { sideBarMenu, trendingMenu, movieMenu, tvshowMenu, cinemaMap, linkIcon }