import React, { useState } from 'react'

function Image({ id = null, title = null, src }) {
    const [isError, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    if (isError)
        return null

    return (
        <div key={id || null} className={"w-full h-full rounded-[10px] overflow-hidden relative" + `${loading ? " animate-skeleton" : ""}`}>
            <img
                onError={() => {
                    setError(true)
                    setLoading(false)
                }}
                onLoad={() => setLoading(false)}
                className="w-full h-full absolute object-cover rounded-[10px]"
                src={src}
                alt=""
            />
            {title && <div
                className="text-white absolute bottom-[20px] left-[30px] bg-black/70 bg-opacity-50 p-[5px] rounded-[5px]"
            >
                {title}
            </div>}
        </div>
    )
}

export default Image