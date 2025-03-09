import { useRef } from "react";
import styles from './Signup.module.css';
import facebookIcon from '../../assets/facebook.png'
import googleIcon from '../../assets/google.png'
import { Link,useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext/NotificationContext";

const website_base_url = process.env.REACT_APP_WEBSITE_BASE_URL

function Signup() {
    const usernameInput = useRef(null);
    const usernameLabel = useRef(null);
    const emailInput = useRef(null);
    const emailLabel = useRef(null);
    const passwordInput = useRef(null);
    const passwordLabel = useRef(null);
    const confirmPasswordInput = useRef(null);
    const confirmPasswordLabel = useRef(null);
    const { showNotification } = useNotification()
    const navigate = useNavigate()

    let waveElement = null

    const handlerSignup = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`http://localhost:8080/identity/users/signup`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'username': usernameInput.current ? usernameInput.current.value : '',
                    'email': emailInput.current ? emailInput.current.value : '',
                    'password': passwordInput.current ? passwordInput.current.value : ''
                })
            })
            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.message)
            }
            const data = await res.json()
            showNotification('success', data.message)
            setTimeout(() => {
                navigate('/login')
            }, 500)
        } catch(err) {
            showNotification('error', err.message)
        }
    }

    const addWaveAnimation = (e) => {
        if (!waveElement) {
            waveElement = document.createElement('div')
            waveElement.classList.add(styles.waveElement)
            document.body.appendChild(waveElement)
            waveElement.style.top = `${e.clientY}px`
            waveElement.style.left = `${e.clientX}px`
        } else {
            waveElement.style.top = `${e.clientY}px`
            waveElement.style.left = `${e.clientX}px`
        }
        setTimeout(() => {
            waveElement?.remove()
            waveElement = null
        }, 300)
    }

    return (
        <div className={styles.entireSignupPage + " w-full h-screen flex justify-center items-center"}>
            <div 
                className={styles.formSignupBox + " w-[300px] h-auto bg-black/70 rounded-[10px] p-3 absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] border-[1px] border-solid border-white text-white"} 
                onClick={addWaveAnimation}
            >
                <h1 className="text-center text-[110%]">Signup</h1>
                <form onSubmit={handlerSignup}>
                    <div className="relative mt-[20px]">
                        <input
                            id="username-input"
                            ref={usernameInput}
                            type="text"
                            className={`${styles.usernameInput} w-full h-[38px] text-black outline-none p-1 px-3 cursor-pointer`}
                            placeholder=" "
                            required
                        />
                        <label
                            id="username-label"
                            ref={usernameLabel}
                            htmlFor="username-input"
                            className={`${styles.usernameLabel} text-black absolute top-[50%] left-[11px] transform translate-y-[-50%] transition-all duration-200 ease-linear bg-white cursor-pointer`}
                        >
                            Enter username:
                        </label>
                    </div>
                    <div className="relative mt-[20px]">
                        <input
                            id="email-input"
                            ref={emailInput}
                            type="text"
                            className={`${styles.emailInput} w-full h-[38px] text-black outline-none p-1 px-3 cursor-pointer`}
                            placeholder=" "
                            required
                        />
                        <label
                            id="email-label"
                            ref={emailLabel}
                            htmlFor="email-input"
                            className={`${styles.emailLabel} text-black absolute top-[50%] left-[11px] transform translate-y-[-50%] transition-all duration-200 ease-linear bg-white cursor-pointer`}
                        >
                            Enter email:
                        </label>
                    </div>
                    <div className="relative mt-[20px]">
                        <input
                            id="password-input"
                            ref={passwordInput}
                            type="password"
                            className={`${styles.passwordInput} w-full h-[38px] text-black outline-none p-1 px-3 cursor-pointer`}
                            placeholder=" "
                            required
                        />
                        <label
                            id="password-label"
                            ref={passwordLabel}
                            htmlFor="password-input"
                            className={`${styles.passwordLabel} text-black absolute top-[50%] left-[11px] transform translate-y-[-50%] transition-all duration-200 ease-linear bg-white cursor-pointer`}
                        >
                            Enter password:
                        </label>
                    </div>
                    <div className="relative mt-[20px]">
                        <input
                            id="confirm-password-input"
                            ref={confirmPasswordInput}
                            type="password"
                            className={`${styles.confirmPasswordInput} w-full h-[38px] text-black outline-none p-1 px-3 cursor-pointer`}
                            placeholder=" "
                            required
                        />
                        <label
                            id="confirm-password-label"
                            ref={confirmPasswordLabel}
                            htmlFor="confirm-password-input"
                            className={`${styles.confirmPasswordLabel} text-black absolute top-[50%] left-[11px] transform translate-y-[-50%] transition-all duration-200 ease-linear bg-white cursor-pointer`}
                        >
                            Enter password again:
                        </label>
                    </div>
                    <div className="flex justify-between mx-1 mt-[8px]">
                        <p>Already have an account?</p>
                        <Link to="/login/" className="text-blue-800 underline">Login</Link>
                    </div>
                    <button
                        type="submit"
                        className="globalButtonStyle w-full h-[30px] outline-none bg-blue-500 mt-[20px] flex justify-center items-center shadow-[2px_2px_2px_grey]"
                    >
                        Signup
                    </button>
                    <div className="relative w-full h-[1px] bg-slate-500 mt-8">
                        <span className="block absolute left-[50%] top-[-13px] bg-black px-2 transform translate-x-[-50%]">Or</span>
                    </div>
                    <div className="flex mt-[15px] border border-1px border-solid border-black cursor-pointer items-center pl-[8px] p-1 bg-white text-black">
                        <img src={googleIcon} className="w-[23px]"/>
                        <p className="ml-[5px]">Signup with Google</p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
