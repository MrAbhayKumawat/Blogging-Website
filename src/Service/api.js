import axios from "axios";
const API_URL = "http://localhost:8000"; // Fixed typo: "htttp" should be "http"
import { API_NOTIFICATION_MESSAGES,SERVICE_URLS } from "../Constants/Config";
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Stop global loader
    return processResponse(response); // Fixed typo: "proccesresponce" to "processResponse"
  },
  (error) => {
    return Promise.reject(processError(error)); // Fixed typo: "procceserror" to "processError"
  }
);

const processResponse = (response) => {
  if (response?.status === 200) {
    // Fixed: Changed "response" to "error.response"
    return {
      isFailure: true,
      data: response.data,
    };
  } else {
    return {
      isFailure: true,
      status: response?.status, // Fixed: Changed "response.status()" to "error.response.status"

      msg: response?.msg,
      code: response?.code,
    };
  }
};
const processError = (error) => {
  if (error.response) {
    // Fixed: Changed "response" to "error.response"
    return {
      isFailure: true,
      data: error.response.data,
    };
  } else if (error.response) {
    // Fixed:
    console.log("error n resoponse", error.toJSON());
    return {
      isError: true,

      msg: API_NOTIFICATION_MESSAGES.responseFailure,
      code:"",
    };
  } else {
    console.log("error n resoponse", error.toJSON());

    return {
      isFailure: true,

      msg: API_NOTIFICATION_MESSAGES.responseFailure,
      code: "",
    };
  }
};

const API = {

}

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = async (body, showuploadproccess, showdownloadproccess) => {
        try {
            const response = await axiosInstance({
                method: value.method,
                url: value.url,
                data: body,
                responseType: value.responseType,
                onUploadProgress: (processEvent) => {
                    if (showuploadproccess) {
                        const percentageCompleted = Math.round((processEvent.loaded * 100) / processEvent.total);
                        showuploadproccess(percentageCompleted);
                    }
                },
                onDownloadProgress: (processEvent) => {
                    if (showdownloadproccess) {
                        const percentageCompleted = Math.round((processEvent.loaded * 100) / processEvent.total);
                        showdownloadproccess(percentageCompleted);
                    }
                }
            });

            // You should handle the response here and return data or do other processing
            return response.data;
        } catch (error) {
            // Handle errors here
            console.error('Error:', error);
            throw error;
        }
    };
}

export { API };