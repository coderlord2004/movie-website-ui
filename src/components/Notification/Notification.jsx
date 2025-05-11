import React, { useRef, useState } from 'react'

const Notification = ({ id, type, message, order, onClose }) => {
  const notificationElement = useRef(null)

  return (
    <div
      ref={notificationElement}
      className={`fixed top-[${order * 10 + 10}px] left-1/2 transform -translate-x-1/2 z-[1000] w-[300px] h-[50px] flex justify-center items-center text-black bg-white rounded-md animate-notify transition-all duration-300 ease-in-out shadow-md`}
      style={{
        border: `3px solid ${type === "success" ? "green" : "red"}`
      }}
    >
      <p>{type === 'error' ? 'Error: ' : ''}{message}</p>
      <button
        className='absolute top-[3px] right-[3px] w-[15px] h-[15px] flex items-center justify-center text-black text-[120%] border-none'
        onClick={() => {
          notificationElement.current.style.transform = `translate(-50%, -${(order + 1) * 150}%)`
          setTimeout(() => {
            onClose(id)
          }, 200)
        }}
      >
        x
      </button>
    </div>
  );
};

export default Notification;
