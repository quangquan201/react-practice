// import axios from "axios";
import axios from "./custom-axios";


const fetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`);
}

const postCreateUser = (name, job) => {
    return axios.post("/api/users", { name , job });
}

const putUpdateUser = (name, job) => {
    return axios.put("/api/users/", { name , job });
}

const deleteUser = (id) => {
  return axios.delete(`/api/users/${id}/`)
}


axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(" saufbnaia",response)
    return response.data ? response.data : { statusCode: response.status };
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export { fetchAllUser , postCreateUser , putUpdateUser , deleteUser };