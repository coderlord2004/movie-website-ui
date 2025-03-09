import React from 'react'
import styles from './MoveToRightAnimation.module.css'

function MoveToRightAnimation() {

    return (
        <div className={"w-full h-full bg-slate-700 flex justify-center items-center absolute rounded-[10px]"}>
            <div className={styles.animationItem + " absolute w-[50px] h-[170%] transform rotate-[20deg] bg-black/30"}></div>
        </div>
    )
}

export default MoveToRightAnimation