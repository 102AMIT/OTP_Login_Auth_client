import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import style from '../styles/Username.module.css'
import toast, { Toaster } from 'react-hot-toast'
// formik use for validate the userdata in form 
import { useFormik } from 'formik';
import { registerValidation } from '../helper/validate'
import convertToBase64 from '../helper/convertImg';
import avatar from '../assets/avatar.jpg'
import { register } from '../helper/helper';

const Register = () => {

  const navigate = useNavigate();
  const [file, setFile] = useState()

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: ''
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      values = await Object.assign(values, { profile: file || '' })
      let registerPromise = register(values)
      toast.promise(registerPromise, {
        loading: 'Creating...',
        success: <b>Register Successfully...!</b>,
        error: <b>Could Not Register</b>
      });
      registerPromise.then(function (){navigate('/')});
    }
  })

  // formik does not support file upload so we need to create this handler 

  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={style.glass} style={{ height: "93%" }}>
          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Register</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Join Now...!
            </span>
          </div>
          <form action="" className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-3">
              <label htmlFor="profile">
                <img className={style.profile_img} src={file || avatar} alt="avater" />
              </label>
              <input type="file" id="profile" name='profile' onChange={onUpload} />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input {...formik.getFieldProps('email')} type="email" className={style.textbox} placeholder='Email' />
              <input {...formik.getFieldProps('username')} type="text" className={style.textbox} placeholder='Username' />
              <input {...formik.getFieldProps('password')} type="password" className={style.textbox} placeholder='Password' />
              <button type='submit' className={style.btn}>Register</button>
            </div>

            <div className="text-center py-4">
              <span className='text-gray-500'>Already Register ? <Link className='text-red-500' to="/">Login Now</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register