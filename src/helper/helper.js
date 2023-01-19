import axios from "axios";
import jwt_decode from "jwt-decode";
axios.defaults.baseURL = 'https://login-auth-api.onrender.com/';

/* Make api request */


/* TO get username from token */
export async function getUsername() {
    const token = localStorage.getItem('token');
    if (!token) return Promise.reject("Can't find token");
    // if we want get back the user info from token then we need to install jwt decode for decode this token
    let decode=jwt_decode(token);
    return decode;
}

/* authenticate function */
export async function authenticate(username) {
    try {
        return await axios.post('/api/authenticate', { username })
    } catch (error) {
        return { error: "Username does not exist...!" }
    }
}


/* get user details */
export async function getUser({ username }) {
    try {
        const { data } = await axios.get(`/api/user/${username}`);
        return { data }
    } catch (error) {
        return { error: "Password does not match...!" }
    }
}


/* register user function */
export async function register(credentials) {
    try {

        const { data: { message }, status } = await axios.post(`/api/register`, credentials)
        let { username, email } = credentials;

        /* send email */
        if (status === 201) {
            await axios.post(`/api/registerMail`, { username, userEmail: email, text: message })
        }

        return Promise.resolve(message);
    } catch (error) {
        return Promise.reject({ error })
    }
}

/* Login function */
export async function verifyPassword({ username, password }) {
    try {
        if (username) {
            const { data } = await axios.post(`/api/login`, { username, password });
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error: "Password does not Match...!" })
    }
}


/* Update User profile function */
export async function updateUser(response) {
    try {
        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateuser', response, { headers: { "authorization": `Bearer ${token}` } });
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: "Couldn't update user profile...!" });
    }
}


/* Generate OTP */

export async function generateOTP(username) {
    try {
        const { data: { code }, status } = await axios.get('/api/generateOTP', { params: { username } });

        // send mail with the OTP
        if (status === 201) {
            let { data: { email } } = await getUser({ username });
            let text = `Your Password Recovery OTP is ${code}.Verify and recover your password.`;
            await axios.post(`/api/registerMail`, { username, userEmail: email, text, subject: "Password recovery OTP" });
        }
        return Promise.resolve(code);

    } catch (error) {
        return Promise.reject({ error: "Couldn't generate OTP...!" })
    }

}


export async function verifyOTP({ username, code }) {
    try {
        const { data, status } = await axios.get('/api/verifyOTP', { params: { username, code } });
        return { data, status };
    } catch (error) {
        return Promise.reject({ error });
    }
}

/* reset password */

export async function resetPassword({ username, password }) {
    try {
        const { data, status } = await axios.put('/api/resetPassword', { username, password });
        return Promise.resolve({ data, status });
    } catch (error) {
        return Promise.reject({ error });
    }
}