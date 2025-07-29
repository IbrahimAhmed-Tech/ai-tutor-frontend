//This is the customized logerror


import showToast from "./showToast";

export default function logError(err, fallbackMessage = "Something went wrong. Please try again.") {
    const status = err?.response?.status;
    const messageFromServer = err?.response?.data?.error;

    if (status === 401) {
        showToast('error', 'Error!', 'Invalid email or password.');

    } else {
        const message = messageFromServer || fallbackMessage;
        showToast('error', 'Error!', message)
       
    }
}
