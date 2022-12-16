import axios from "axios"

export const fetchProductList = async ({ pageParam = 1 }) => {
    const { data } = await axios.get(`http://localhost:8080/api/products?page=${pageParam}`)
    return data
}

export const fetchProduct = async(id) => {
    const { data } = await axios.get(`http://localhost:8080/api/products/${id}`)
    return data
}

export const fetchRegister = async(input)=>{
    const {data} = await axios.post(`http://localhost:8080/api/products/auth/register`,input)
    return data
}

