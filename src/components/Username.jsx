import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from '../styles/Username.module.css'
import { Toaster } from 'react-hot-toast'
// formik use for validate the userdata in form 
import { useFormik } from 'formik'
import { usernameValidate } from '../helper/validate'
import { useAuthStore } from '../store/store'



import avatar from '../assets/avatar.jpg'

const Username = () => {
  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);



  const formik = useFormik({
    initialValues: {
      username: ''
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      setUsername(values.username);
      console.log(values)
      navigate('/password');
    }
  })

  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={style.glass}>
          <div className="title flex flex-col items-center justify-center">
            <h4 className='text-5xl font-bold'>Hello..!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Welcome Back !!!
            </span>
          </div>
          <form action="" className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img className={style.profile_img} src={avatar} alt="avater" />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input {...formik.getFieldProps('username')} type="text" className={style.textbox} placeholder='Username' />
              <button type='submit' className={style.btn}>Let's Go</button>
            </div>

            <div className="text-center py-4">
              <span className='text-gray-500'>Not A Member? <Link className='text-red-500' to="/register">Register Now</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Username