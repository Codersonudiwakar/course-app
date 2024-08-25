import axios  from "axios";

export const base_url='http://localhost:8080/';

export const myAxios=axios.create({
    baseURL:base_url,
});