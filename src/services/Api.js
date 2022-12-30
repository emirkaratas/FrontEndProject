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

export const fetchProductList = async ({ pageParam = 1, filter }) => {
    const { data } = await axios.get(`http://localhost:8080/api/products?page=${pageParam}`)
    if (filter !== "" && filter != undefined) {
        return data.filter(product => product.title.toLowerCase().includes(filter))
    }
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
    // const { data } = await axios.get(`http://localhost:8080/api/products/order`)
    // return data
    return [
        { user: { mail: "emirkaratassss@gmail.com" }, id: 1, items: [{ id: 2, count: 1 }, { id: 3, count: 4 }], orderDetails: { name: "Emir", surname: "Karataş", telNo: "5530957203", address: "Samsun" } },
        { user: { mail: "bilgeylmaz@gmail.com" }, id: 2, items: [{ id: 3, count: 1 }, { id: 1, count: 2 }], orderDetails: { name: "Bilge", surname: "Yılmaz", telNo: "5530000000", address: "İstanbul" } }
    ]
}

export const fetchOrder = async (id) => {
    if (id == 1) return { user: { mail: "emirkaratassss@gmail.com" }, id: 1, items: [{ id: 2, count: 1 }, { id: 3, count: 4 }], orderDetails: { name: "Emir", surname: "Karataş", telNo: "5530957203", address: "Samsun" } }
    return { user: { mail: "bilgeylmaz@gmail.com" }, id: 2, items: [{ id: 3, count: 1 }, { id: 1, count: 2 }], orderDetails: { name: "Bilge", surname: "Yılmaz", telNo: "5530000000", address: "İstanbul" } }
}

export const deleteProduct = async (id) => {
    const { data } = await axios.delete(`http://localhost:8080/api/products/${id}`)
    return data
}

export const updateProduct = async (entity) => {
    const { data } = await axios.put(`http://localhost:8080/api/products/${entity.id}`, entity.product)
    return data
}

export const postProduct = async (product) => {
    const { data } = await axios.post("http://localhost:8080/api/products",product)
    return data
}