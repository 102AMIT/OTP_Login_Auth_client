import React, { useState, useEffect } from 'react'
import style from '../styles/Username.module.css'
import toast, { Toaster } from 'react-hot-toast'
import { useAuthStore } from '../store/store'
import { generateOTP, verifyOTP } from '../helper/helper'
import { useNavigate } from 'react-router-dom';
// formik use for validate the userdata in form 


const Recovery = () => {
  const { username } = useAuthStore(state => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useeffect");
    generateOTP(username).then((OTP) => {

      if (OTP) return toast.success("OTP has been sent to your email")

      return toast.error('Problem while generating OTP');
    })
  }, [username]);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code: OTP })
      if (status === 201) {
        toast.success("Verify OTP successfully");
        return navigate('/reset');
      }

    } catch (error) {
      return toast.error("Wrong OTP..! Check email again")
    }
  }

  // handler of resend OTP

  function resendOTP() {
    let sendPromise = generateOTP(username);

    toast.promise(sendPromise, {
      loading: "Sending...",
      success: <b>OTP has been send to your email</b>,
      error: <b>Could Not Send It</b>
    });

    sendPromise.then(OTP => {
      // console.log(OTP)
    })

  }

  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={style.glass}>
          <div className="title flex flex-col items-center">
            <h4 className='text-3xl font-bold'>Recovery Password</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter OTP to recover password.
            </span>
          </div>
          <form action="" className="pt-20" onSubmit={onSubmit}>

            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="py-4 text-sm text-left text-gray-500"> Enter 6 digit OTP Sent to your email address</span>
                <input onChange={(e) => setOTP(e.target.value)} type="password" className={style.textbox} placeholder='OTP' />
              </div>
              <button type='submit' className={style.btn}>Recover</button>
            </div>
          </form>
          <div className="text-center py-4">
            <span className='text-gray-500'>Can't get OTP? <button onClick={resendOTP} className='text-red-500'>Resend</button></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recovery