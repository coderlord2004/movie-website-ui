import React from 'react'
import styles from './SpinAnimation.module.css'

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
      className={`w-[30px] h-[30px] flex justify-center items-center rounded-[50%] absolute left-[45%] transform translate-x-[-50%] ` + styles.spinAnimation}
    >
    </div>
  )
}

export default SpinAnimation