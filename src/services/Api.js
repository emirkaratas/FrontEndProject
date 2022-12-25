import axios from "axios"

axios.interceptors.request.use(function (config) {
    const { origin } = new URL(config.url)
    const allowedOrigin = ["http://localhost:8080/api/products"]
    const token = localStorage.getItem('access-token')

    if (allowedOrigin.includes(origin)) {
        config.headers.authorization = token
    }
    return config
}, function (error) {
    return Promise.reject(error);
});

export const fetchProductList = async ({ pageParam = 1 }) => {
    const { data } = await axios.get(`http://localhost:8080/api/products?page=${pageParam}`)
    return data
}

export const fetchProduct = async (id) => {
    const { data } = await axios.get(`http://localhost:8080/api/products/${id}`)
    return data
}

export const fetchRegister = async (input) => {
    const { data } = await axios.post(`http://localhost:8080/api/products/auth/register`, input)
    return data
}

export const fetchLogin = async (input) => {
    const { data } = await axios.post(`http://localhost:8080/api/products/auth/login`, input)
    return data
}

export const fetchMe = async () => {
    const { data } = await axios.get(`http://localhost:8080/api/products/auth/me`)
    return data
}

export const fetchLogout = async () => {
    const { data } = await axios.post(`http://localhost:8080/api/products/auth/logout`, {
        refresh_token: localStorage.getItem('refresh-token')
    })
    return data
}

export const postOrder = async (input) => {   
    const { data } = await axios.post(`http://localhost:8080/api/products/order`, input)
    return data
}

//Backend Connection in Development

export const fetchOrders = async () => {
    const { data } = await axios.get(`http://localhost:8080/api/products/order`)
    console.log(data);
    return data
}