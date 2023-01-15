import toast from 'react-hot-toast'


// validate login page username
export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);

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
    const error= passwordVerify({},values);
    return error;
}

// validate password

function passwordVerify(error={},values){
    const specialChars= /[`~!@#$%^&*()-_+{}[\]\\|,.//?;':"]/

    if(!values.password){
        error.password=toast.error("Password Required...!");
    }else if(values.password.includes(" ")){
        error.password=toast.error("Wrong Password...!");
    }else if(values.password.length <4){
        error.password=toast.error("Password Must Be More Than 4 Character Long");
    }else if(!specialChars.test(values.password)){
        error.password=toast.error("Password Must Have Special Character");
    }

    return error;
}



