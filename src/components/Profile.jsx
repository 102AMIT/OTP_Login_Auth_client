import React, { useState } from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
// formik use for validate the userdata in form 
import { useFormik } from 'formik';
import { profileValidation } from '../helper/validate'
import convertToBase64 from '../helper/convertImg';
import useFetch from '../hooks/fetch.hook';
import { updateUser } from '../helper/helper';

import avatar from '../assets/avatar.jpg'
import style from '../styles/Username.module.css'
import extend from '../styles/Profile.module.css';


const Profile = () => {

  const [file, setFile] = useState()
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate();



  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
      address: apiData?.address || ''
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      values = await Object.assign(values, { profile: file || apiData?.profile || '' })
      let updatePromise = updateUser(values);
      toast.promise(updatePromise, {
        loading: 'Profile updating...!',
        success: <b>Update Successfully...!</b>,
        error: <b>Could not Update</b>
      })
    }
  })

  // formik does not support file upload so we need to create this handler 

  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  // logout handeler function

  function userLogout(){
    localStorage.removeItem('token');
    navigate('/')
  }

  if (isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>
  if (serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={`${style.glass} ${extend.glass}`} style={{ height: "93%" }}>
          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              You can update the details.
            </span>
          </div>
          <form action="" className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-3">
              <label htmlFor="profile">
                <img className={`${style.profile_img} ${extend.profile_img}`} src={apiData?.profile || file || avatar} alt="avater" />
              </label>
              <input type="file" id="profile" name='profile' onChange={onUpload} />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('firstName')} type="text" className={`${style.textbox} ${extend.textbox}`} placeholder='First name' />
                <input {...formik.getFieldProps('lastName')} type="text" className={`${style.textbox} ${extend.textbox}`} placeholder='Last name' />
              </div>
              <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('mobile')} type="text" className={`${style.textbox} ${extend.textbox}`} placeholder='Mobile No.' />
                <input {...formik.getFieldProps('email')} type="email" className={`${style.textbox} ${extend.textbox}`} placeholder='Email' />
              </div>
              <input {...formik.getFieldProps('address')} type="text" className={`${style.textbox} ${extend.textbox}`} placeholder='Address' />
              <button type='submit' className={style.btn}>Update</button>
            </div>

            <div className="text-center py-4">
              <span className='text-gray-500'>Come Back later? <Link onClick={userLogout} className='text-red-500' to="/">Logout</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile