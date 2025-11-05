
import config from "@/config/config";
import axios, { type AxiosRequestConfig } from "axios"

export const axiosInstance = axios.create({
    baseURL: config.baseUrl,
    withCredentials: true // must to set cookie in frontend and if we use fetechbaseQuery then credentials: "include"
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
  });


  // Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  },

);


let isRefreshing = false

let pendingQueue: {
  resolve: (value: unknown)=> void;
  reject: (value: unknown)=> void;
}[] = [];

const processQueue = (error: unknown)=>{
  pendingQueue.forEach((promise)=>{
    if(error){
      Promise.reject(error)
    }else{
      Promise.resolve(null)
    }
  })

  pendingQueue = []
}
// Add a response interceptor
axiosInstance.interceptors.response.use(
  // function onFulfilled(response) {
  //   // Any status code that lie within the range of 2xx cause this function to trigger
  //   // Do something with response data
  //   return response;
  // }, function onRejected(error) {
  //   // Any status codes that falls outside the range of 2xx cause this function to trigger
  //   // Do something with response error
  //   return Promise.reject(error);
  // }

  //! use for refresh token

  (response)=>{

    return response
  },

  async (error)=>{


    const originalreq = error.config as AxiosRequestConfig & {_retry: boolean}
    console.log("req failed", error.response.data.message);

    if(
      error.response.status === 500 
      && error.response.data.message==="jwt expired"
      && !originalreq._retry 
      )
      {
      console.log("your token is expired");
        originalreq._retry = true // jate infinity bar originalreq na chole tai.
      if(isRefreshing){
        return new Promise((resolve, reject)=>{
          pendingQueue.push({resolve, reject})
        })
        .then(()=> axiosInstance(originalreq))
        .catch((error)=> Promise.reject(error))
      }


      isRefreshing = true

      try {

        const res = await axiosInstance.post("/auth/refresh-token")

        console.log(res);

        processQueue(null)

        return axiosInstance(originalreq)  // eta korlei amdr ref token er kaj hbe .logout hbe na r. kintu onk req eksthe handle korle ta etar karone ooff hoy thkbe.ta thik korte hbe
        
        
      } catch (error) {

        processQueue(error)
        return Promise.reject(error)
        
        
      }finally{
        isRefreshing = false
      }
      
    }
    

    //!for everything
    return Promise.reject(error)
  }
  
  );