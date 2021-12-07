import axios from 'axios';

const instance = axios.create({
    baseURL: "https://whatsapp-sriram.herokuapp.com",
});
export default instance