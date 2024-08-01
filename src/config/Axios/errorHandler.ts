import { AxiosError } from "axios";
import { toast } from "react-toastify";

const errorHandler = (error: AxiosError): void => {
  if (!error) return;

  let message: string | undefined;

  if (error.response) {
    const { statusCode, message: responseMessage } = error.response.data as {
      statusCode: number;
      message: string;
    };

    switch (statusCode) {
      case 400:
        toast.error(responseMessage);
        break;
      case 401:
        toast.error("Waktu anda habis. Silahkan login ulang");
        localStorage.removeItem("auth");
        window.location.replace("/login");
        break;
      case 403:
        toast.error(responseMessage);
        break;
      case 500:
        message = "Something went terribly wrong";
        break;
      default:
        message = error.message;
        break;
    }

    if (typeof message === "string") console.log("message", message);
  }
};

export default errorHandler;
