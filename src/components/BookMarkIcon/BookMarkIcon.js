import React from 'react'

function BookMarkIcon({ width="18px", height="18px" }) {
    return (
        <svg
            title="Watch later"
            xmlns="http://www.w3.org/2000/svg"
            width="10%"
            viewBox="0 0 16 16"
            style={{ 
                width: width,
                height: height,         
                marginTop: "5px",
                cursor: "pointer", 
            }}
        >
            <path
            d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"
            fill="none"
            stroke="white"
            strokeWidth="1"
            />
        </svg>
    )
}

export default BookMarkIcon