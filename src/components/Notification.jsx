import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";

const Notification = ({ id, type, message, order, onClose, redirectUrl }) => {
  const notificationElement = useRef(null);

  return (
    <div
      ref={notificationElement}
      className={`fixed top-[${order * 10 + 10}px] left-1/2 transform -translate-x-1/2 z-[1000] w-[300px] h-auto flex justify-center items-center text-black bg-white rounded-md animate-notify transition-all duration-300 ease-in-out shadow-md p-[10px]`}
      style={{
        border: `3px solid ${type === "error" ? "red" : "green"}`,
      }}
    >
      <p className="w-full h-full text-center align-middle overflow-auto">
        {type === "error" ? "Error: " : ""}
        {message}
      </p>
      {redirectUrl && (
        <Link
          to={`/watch-detail/hot-movies${redirectUrl}`}
          className="inline-flex items-center align-middle"
        >
          <FaArrowCircleRight className="text-yellow-400 text-[25px]" />
        </Link>
      )}
      <button
        className="absolute top-[3px] right-[3px] w-[15px] h-[15px] flex items-center justify-center text-black text-[120%] border-none"
        onClick={() => {
          notificationElement.current.style.transform = `translate(-50%, -${(order + 1) * 150}%)`;
          setTimeout(() => {
            onClose(id);
          }, 200);
        }}
      >
        x
      </button>
    </div>
  );
};

export default Notification;
