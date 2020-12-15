import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-fa460.firebaseio.com/'
});

export default instance;