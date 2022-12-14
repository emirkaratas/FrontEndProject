import axios from "axios"

export const fetchProductList = async () => {
    const { data } = await axios.get("http://localhost:8080/api/products")
    return data
}

export const fetchProduct = async(id) => {
    const { data } = await axios.get(`http://localhost:8080/api/products/${id}`)
    return data
}