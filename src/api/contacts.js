import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:3006/",
});

// whenever you use on realtime project just copy past the URL in baseURL than it will work fine