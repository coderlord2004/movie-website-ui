import React, { createContext, useState, useContext, useCallback } from 'react'
import Notification from '../components/Notification/Notification'

const NotificationContext = createContext({
    notification: null,
    showNotification: () => { },
})

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState([])

    const removeNotification = useCallback((id) => {
        const newNotification = notification.filter((item) => item.id !== id)
        setNotification(newNotification);
    }, [notification]);

    const showNotification = useCallback((type, message) => {
        const id = crypto.randomUUID();
        const newNotification = {
            id,
            type,
            message,
        }
        setNotification(prev => [...prev, newNotification])
        setTimeout(() => {
            setNotification(prev => prev.filter(item => item.id !== id));
        }, 5000);
    }, []);

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            {notification.length !== 0 ? (
                notification.map((item, index) => (
                    <Notification
                        key={item.id}
                        type={item.type}
                        message={item.message}
                        order={index}
                        onClose={removeNotification}
                    />
                ))
            ) : null}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider')
    }
    return context
}