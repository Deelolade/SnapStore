export const getErrorMessage = (err)=>{
    if (err?.response?.data){
        if(typeof err.response.data === "string"){
            return err.response.data
        }
        if (typeof err.response.data.message === "string"){
            return err.response.data.message
        }
        return JSON.stringify(err.response.data)
    }
    return err?.message || "An unexpected error occured "
}
