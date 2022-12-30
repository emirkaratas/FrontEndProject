import * as yup from 'yup'

const validations = yup.object().shape({
    title: yup
    .string()
    .required("Zorunlu Bir Alan"),
    price: yup
    .string()
    .required("Zorunlu Bir Alan"),
    description: yup
    .string()
    .required("Zorunlu Bir Alan"),
})

export default validations;