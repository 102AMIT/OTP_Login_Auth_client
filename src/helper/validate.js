import toast from 'react-hot-toast'
import {authenticate} from './helper'

// validate login page username
export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);
    if(values.username){
        // check for the user existence
        const {status} = await authenticate(values.username);

        if(status !== 200){
            errors.exist = toast.error('User does not exist');
        }
    }
    return errors;
}

// validate username
function usernameVerify(error = {}, values) {
    if (!values.username) {
        error.username = toast.error('Username Required...!');
    } else if (values.username.includes(" ")) {
        error.username = toast.error("Invalid Username...!");
    }

    return error

}

// validate password
export async function passwordValidate(values) {
    const error = passwordVerify({}, values);
    return error;
}

// validate password

function passwordVerify(error = {}, values) {
    const specialChars = /[`~!@#$%^&*()-_+{}[\]\\|,.//?;':"]/

    if (!values.password) {
        error.password = toast.error("Password Required...!");
    } else if (values.password.includes(" ")) {
        error.password = toast.error("Wrong Password...!");
    } else if (values.password.length < 4) {
        error.password = toast.error("Password Must Be More Than 4 Character Long");
    } else if (!specialChars.test(values.password)) {
        error.password = toast.error("Password Must Have Special Character");
    }

    return error;
}


// validate reset password

export async function resetPasswordValidation(values) {
    const error = passwordVerify({}, values);

    if (values.password !== values.confirm_pwd) {
        error.exist = toast.error("Password not match..");
    }

    return error;
}


// validate register form

export async function registerValidation(values) {
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);

    return errors;
}

// validate email

function emailVerify(error = {}, values) {
    if (!values.email) {
        error.email = toast.error("Email Required...!");
    } else if (values.email.includes(" ")) {
        error.email = toast.error("Wrong Email...!");
    } else if (!/[`~!@#$%^&*()-_+{}[\]\\|,.//?;':"]/.test(values.email)) {
        error.email = toast.error("Invalid Email address...!");
    }

    return error;
}


// validate profile page

export async function  profileValidation(values){
    const errors = emailVerify({},values);
    return errors;
}
