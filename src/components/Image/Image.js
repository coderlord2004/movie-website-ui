import React, { useState } from 'react'
import MoveToRightAnimation from '../LoadingAnimation/MoveToRightAnimation/MoveToRightAnimation'

function Image({ id = null, title = null, src }) {
    const [isError, setError] = useState(false)
    const [isLoading, setLoading] = useState(true)

    if (isError)
        return (
            <div className="w-full h-full flex justify-center items-center text-white">Image is error!</div>
        )

    return (
        <div key={id || null} className="w-full h-full rounded-[10px] overflow-hidden relative">
            <MoveToRightAnimation />
            <img
                onError={() => {
                    setError(true)
                }}
                onLoad={() => setLoading(false)}
                className="w-full h-full absolute object-cover"
                src={src}
                alt=""
            />
            {title && <div
                className="text-white absolute bottom-[20px] left-[30px] bg-black/70 bg-opacity-50 p-[5px]"
            >
                {title}
            </div>}
        </div>
    )
}

export default Image