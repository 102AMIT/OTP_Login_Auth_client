import React from 'react'
import style from '../styles/Username.module.css'
import { Toaster } from 'react-hot-toast'
// formik use for validate the userdata in form 
import { useFormik } from 'formik';
import { resetPasswordValidation } from '../helper/validate'



const Reset = () => {

  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_pwd:''
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      console.log(values);
    }
  })

  return (
    <div className="container mx-auto">
    <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={style.glass} style={{width:"35%"}}>
          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Reset</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter new Password.
            </span>
          </div>

          <form action="" className="py-20" onSubmit={formik.handleSubmit}>
            
            <div className="textbox flex flex-col items-center gap-6">
              <input {...formik.getFieldProps('password')} type="password" className={style.textbox} placeholder='New Password' />
              <input {...formik.getFieldProps('confirm_pwd')} type="password" className={style.textbox} placeholder='Confirm Password' />
              <button type='submit' className={style.btn}>Reset</button>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}

export default Reset