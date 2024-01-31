import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {  resetUser } from "../store/reducers/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    credentials: 'include'
})

const baseQueryReauth = async (args: any, api:any , extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions)
    console.log(result, "result")
    // @ts-ignore
    if(result?.error?.data?.error === "jwt expired"){
        
        console.log("jwt expired")
        const refreshResult = await baseQuery('/auth/refresh_token', api, extraOptions)
        if(refreshResult.data){
            // store new token
            // retry orignal request
            result = await baseQuery(args, api, extraOptions)
        }else{
            api.dispatch(resetUser())
        }
    }
    return result
}

export const Api = createApi({
    baseQuery: baseQueryReauth,
    endpoints: builder => ({})
})


