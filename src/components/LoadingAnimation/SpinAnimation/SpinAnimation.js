import React from 'react'

function SpinAnimation({ onLoading, additionalStyles }) {
  return (
    <div
      style={onLoading ? {
        ...additionalStyles,
        border: "4px solid white",
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
      } : {
        display: "none"
      }}
      className="w-[30px] h-[30px] flex justify-center items-center rounded-[50%] absolute left-[50%] transform translate-x-[-50%] animate-spinner"
    >
    </div>
  )
}

export default SpinAnimation