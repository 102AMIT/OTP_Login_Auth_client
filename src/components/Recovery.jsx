import React from 'react'
import style from '../styles/Username.module.css'
import { Toaster } from 'react-hot-toast'
// formik use for validate the userdata in form 




const Recovery = () => {



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
          <form action="" className="pt-20">

            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="py-4 text-sm text-left text-gray-500"> Enter 6 digit OTP Sent to your email address</span>
                <input  type="password" className={style.textbox} placeholder='OTP' />
              </div>
              <button type='submit' className={style.btn}>Recover</button>
            </div>

            <div className="text-center py-4">
              <span className='text-gray-500'>Can't get OTP? <button className='text-red-500'>Resend</button></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Recovery