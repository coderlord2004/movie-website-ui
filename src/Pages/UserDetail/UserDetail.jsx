import React, { useEffect, useState } from "react";
import styles from './UserDetail.module.css'
import { Link } from "react-router-dom";
import SpinAnimation from "../../components/LoadingAnimation/SpinAnimation/SpinAnimation";
import { useNotification } from "../../context/NotificationContext.jsx";
import { useUserContext } from "../../context/AuthUserContext.jsx";
import Header from "../../components/Header/Header";

//"https://img.icons8.com/material/30/person-male.png"

const UserDetail = () => {
  const [image, setImage] = useState(null);
  const [passwordChangingBox, setPasswordChangingBox] = useState()
  const [authenticatedPassword, setAuthenticatedPassword] = useState(true)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { showNotification } = useNotification()
  const { authUser, saveAuthUser } = useUserContext()
  console.log('authUser from UserDetail: ', authUser);
  // useEffect(() => {
  //   try {
  //     const fetchUserInfo = async () => {
  //       const res = await fetch(`${import.meta.env.VITE_WEBSITE_BASE_URL}/users/myinfo`, {
  //         method: "GET",
  //         headers: {
  //         }
  //       })
  //       if (!res.ok) {
  //         const errorData = await res.json()
  //         throw new Error(errorData.message || "Cann't load the user information!")
  //       }
  //       const data = await res.json()
  //       localStorage.setItem('evdUserInfo', JSON.stringify(data.result))
  //       setUser(data.result)
  //     }
  //     if (!user) {
  //       // fetchUserInfo()
  //     }
  //   } catch (err) {
  //     alert(err)
  //   }
  // }, [user])

  const authenticatePassword = (e) => {
    const fetchPassword = async () => {
      const res = await fetch(`${import.meta.env.VITE_WEBSITE_BASE_URL}/auth/authenticate-password`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'email': authUser.email,
          'password': e.target.value
        })
      })
      const data = await res.json()
      if (data.code !== 2000) {
        setAuthenticatedPassword(false)
      } else {
        setAuthenticatedPassword(true)
      }
    }
    if (e.target.value) {
      fetchPassword()
    }
  }

  const handleChangingPassword = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const changePassword = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${import.meta.env.VITE_WEBSITE_BASE_URL}/users/update-password/`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'password': formData.get("newPassword")
          }),
          credentials: 'include'
        })
        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.message || "Cann't update password!")
        }
        setLoading(false)
        const data = await res.json()
        showNotification('success', data.message)
      } catch (err) {
        setLoading(false)
        showNotification('error', err.message)
      }
    }

    if (authenticatedPassword) {
      changePassword()
    }
  }

  return (
    <div className="w-auto h-screen flex justify-center text-white relative box-border">
      <Header
        onSearching={() => { }}
        onReset={() => { }}
      />
      <div className="w-[80%] h-[300px] border-[2px] border-solid border-[red] rounded-[8px] flex flex-col sm:flex-row justify-center items-center mt-[50px]">
        <div className="avatar-box w-[50%] h-[100%] flex flex-col items-center justify-center relative bg-black/50">
          {authUser ? (
            authUser.avatar ? (
              <img
                className="w-[80%] h-[80%] rounded-[50%]"
                src={image ? image : `${authUser.avatarPath}`}
                alt=""
              />
            ) : (
              <div className="w-[100px] h-[100px] rounded-[50%] bg-slate-400"></div>
            )
          ) : (
            <div className="w-[100px] h-[100px] rounded-[50%] bg-slate-400"></div>
          )}
          <p className="text-[130%]">{authUser ? authUser.username : ''}</p>
        </div>
        <div className="w-[50%] h-[100%] p-[5px] flex flex-col justify-center items-center bg-black/50">
          <p><b>Username:</b> {authUser ? authUser.username : ''}</p>
          <p><b>Email:</b> {authUser ? authUser.email : ''}</p>
          <p><b>Account Creating Time:</b> {authUser ? authUser.accountCreatingTime : ''}</p>
          <button onClick={() => setPasswordChangingBox(true)}>Change password</button>
          <input type="file" onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))} />
          <Link to="/home">Home</Link>
        </div>
      </div>
      {passwordChangingBox ? <div className={styles.passwordChangingBox + " fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center overflow-hidden z-[1000]"}>
        <div
          className="overlay absolute top-0 right-0 left-0 bottom-0 bg-[rgba(100,116,139,0.5)] z-0 cursor-pointer"
          onClick={() => {
            setPasswordChangingBox(false)
            setAuthenticatedPassword(true)
          }}
        >
        </div>
        <form className="passwordChangingForm w-[300px] h-[210px] relative p-[10px] rounded-[10px] bg-white flex flex-col items-center justify-center text-black z-10" onSubmit={handleChangingPassword}>

          <div className="oldPasswordField w-full h-[32px] border-[1px] border-solid border-[black] rounded-[5px] p-[5px] mt-[5px] mb-[8px] flex justify-center items-center">
            <input type={showPassword ? "text" : "password"} name="oldPassword" className="outline-none w-full h-full" placeholder="Old password" onBlur={authenticatePassword} required />
            <img width="17px" height="17px" src={showPassword ? "https://img.icons8.com/ios-glyphs/30/hide.png" : "https://img.icons8.com/material-two-tone/24/visible.png"} alt={showPassword ? "hide" : "visible"} onClick={() => setShowPassword(!showPassword)} />
          </div>
          {authenticatedPassword ? '' : <p className="passwordAuthenticationResult p-0 text-red-500 mt-[-8px] mb-[3px]">Password is incorrect!</p>}

          <div className="newPasswordField w-full h-[32px] border-[1px] border-solid border-[black] rounded-[5px] mb-[8px] p-[5px] flex justify-center items-center">
            <input type={showPassword ? "text" : "password"} name="newPassword" className="outline-none w-full h-full" placeholder="New password" required />
            <img width="17px" height="17px" src={showPassword ? "https://img.icons8.com/ios-glyphs/30/hide.png" : "https://img.icons8.com/material-two-tone/24/visible.png"} alt={showPassword ? "hide" : "visible"} onClick={() => setShowPassword(!showPassword)} />
          </div>

          <div className="confirmPasswordField w-full h-[32px] border-[1px] border-solid border-[black] rounded-[5px] mb-[8px] p-[5px] flex justify-center items-center">
            <input type={showPassword ? "text" : "password"} name="confirmPassword" className="outline-none w-full h-full" placeholder="Confirm password" required />
            <img width="17px" height="17px" src={showPassword ? "https://img.icons8.com/ios-glyphs/30/hide.png" : "https://img.icons8.com/material-two-tone/24/visible.png"} alt={showPassword ? "hide" : "visible"} onClick={() => setShowPassword(!showPassword)} />
          </div>
          <button
            onClick={() => {
              setPasswordChangingBox(false)
              setAuthenticatedPassword(true)
            }}
            className="w-[23px] h-[23px] absolute top-[5px] right-[5px] cursor-pointer text-[120%] flex items-center justify-center"
            title="Come out"
          >
            x
          </button>
          <button
            type="submit"
            className="globalButtonStyle w-[60px] h-[30px] flex justify-center items-center"
          >
            {loading ? <SpinAnimation
              onLoading={loading}
              style={{
                width: '22px',
                height: '22px',
                border: '4px solid white',
              }}
            >
            </SpinAnimation> : 'Save'}
          </button>
        </form>
      </div> : ''}
    </div>
  );
};

export default UserDetail;
