import axios from "axios"

axios.interceptors.request.use(function (config) {
    const { origin } = new URL(config.url)
    const allowedOrigin = "http://localhost:7200/api"
    const token = localStorage.getItem('access-token')

    // if (allowedOrigin.includes(origin)) {
    //     config.headers.authorization = token      
    // }
    config.headers.token = token
    config.headers.authorization = `Bearer ${token}`

    return config
}, function (error) {
    return Promise.reject(error);
});

export const fetchProductList = async ({ pageParam = 1, queryKey }) => {
    if (JSON.stringify(queryKey[1]) === '{}') {
        const { data } = await axios.get(`https://localhost:7200/api/Products/page?page=${pageParam}`)
        return data
    }
    else {
        const { data } = await axios.post(`https://localhost:7200/api/Products/filter/${pageParam}?name=${queryKey[1].filter}`)
        return data
    }

}

export const fetchProduct = async (id) => {
    const { data } = await axios.get(`https://localhost:7200/api/Products/getoneproductwithdetails/${id}`)
    return data.data
}

export const fetchAdminProducts = async () => {
    const { data } = await axios.get("https://localhost:7200/api/Products/getproductswithdetails")
    return data.data
}

export const fetchTakeProducts = async (num) => {
    const { data } = await axios.get(`https://localhost:7200/api/Products/getlastproducts?number=${num}`)
    return data.data
}

export const fetchRegister = async (input) => {
    const { data } = await axios.post(`https://localhost:7200/api/Auth/registerUser`, input)
    return data.data
}

export const fetchLogin = async (input) => {
    const { data } = await axios.post(`https://localhost:7200/api/Auth/login`, input)
    return data.data
}

export const fetchMe = async () => {
    const { data } = await axios.get(`https://localhost:7200/api/Auth/authMe`)
    return data.data
}

// export const fetchLogout = async () => {
//     const { data } = await axios.post(`https://localhost:7200/api/Auth/delete`, {
//         refresh_token: localStorage.getItem('refresh-token')
//     })
//     return data
// }

export const postOrder = async (input) => {
    const { data } = await axios.post(`https://localhost:7200/api/Orders/createorder`, input)
    return data
}

export const fetchOrders = async () => {
    const { data } = await axios.get("https://localhost:7200/api/Orders/getorders")
    return data.data
}

export const fetchOrder = async (id) => {
    const { data } = await axios.get(`https://localhost:7200/api/Orders/getwithdetails/${id}`)
    return data.data
}

export const deleteProduct = async (id) => {
    const { data } = await axios.delete(`https://localhost:7200/api/Products/delete?id=${id}`)
    return data
}

export const updateProduct = async (entity) => {
    const { data } = await axios.put(`https://localhost:7200/api/Products/updatewithdto`, entity)
    return data
}

export const postProduct = async (product) => {
    const { data } = await axios.post("https://localhost:7200/api/Products/addwithdto", product)
    return data
}