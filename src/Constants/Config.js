export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: "Loding....",
        message:"data successfully loaded"
    },
    success: {
        title: "success",
        message:"data successfully loaded"
        
    },
    responseFailure: {
        title: "error",
        message: "an  error while faching data please try again later"

    },
    requestFailure: {
        title: "request failure",
        message:"an error while fetching data please try again later"
    },
    networkError:{

        title:"network error",
        message:"an error while fetching data please try again later"


    }
} 




export const SERVICE_URLS = {
    userSignup: {
        url:
            "/signup",
        method: "POST"
    }
}