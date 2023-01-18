import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from '../styles/Username.module.css'
import toast, { Toaster } from 'react-hot-toast'
// formik use for validate the userdata in form 
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate'
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store'
import { verifyPassword } from '../helper/helper'
import avatar from '../assets/avatar.jpg'


const Password = () => {

  const navigate = useNavigate();
  const { username } = useAuthStore(state => state.auth);
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);

  const formik = useFormik({
    initialValues: {
      password: ''
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      let loginPromise = verifyPassword({ username, password: values.password })
      toast.promise(loginPromise, {
        loading: 'Checking...',
        success: <b>Login Successfully...</b>,
        error: <b>Password Not Match..!</b>
      });

      loginPromise.then(res => {
        let { token } = res.data;
        localStorage.setItem('token', token);
        navigate('/profile');
      })
    }
  })

  if (isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>
  if (serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={style.glass}>
          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Hello {apiData?.firstName || apiData?.username}</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More By Connecting With Us.
            </span>
          </div>
          <form action="" className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img className={style.profile_img} src={apiData?.profile || avatar} alt="avater" />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input {...formik.getFieldProps('password')} type="password" className={style.textbox} placeholder='Password' />
              <button type='submit' className={style.btn}>Sign in</button>
            </div>

            <div className="text-center py-4">
              <span className='text-gray-500'>Forget Password <Link className='text-red-500' to="/recovery">Recover Now</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Password