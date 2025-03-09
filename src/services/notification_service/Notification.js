import React, { useRef, useState } from 'react'
import styles from './Notification.module.css'

const Notification = ({ type, message, onClose }) => {
  const notificationElement = useRef(null)
  
  return (
    <div
      ref={notificationElement}
      className={styles.notificationElement}
      style={{ 
        border: `3px solid ${type === "success" ? "green" : "red"}` 
      }}
    >
      <p>{type === 'error' ? 'Error: ': ''}{message}</p>
      <button 
        className={styles.deleteElement} 
        onClick={() => {
          notificationElement.current.style.transform = 'translate(-50%, -55px)'
          setTimeout(() => {
            onClose()
          }, 200)
        }}
      >
        x
      </button>
    </div>
  );
};

export default Notification;
