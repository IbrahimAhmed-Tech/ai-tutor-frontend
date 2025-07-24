//This is the customized toaster.
import { toast } from 'react-hot-toast';

export default function showToast(type, message) {
    const options = {
        duration: 3000,
        style: {
            background: type === "success" ? "#22c55e" : "#ef4444",
            color: "#fff",           
        },
    };

    if (type === "success") {
        toast.success(message, options);
    } else if (type === "error" || type === "failure") {
        toast.error(message, options);
    } else {
        toast(message, options); 
    }
}
