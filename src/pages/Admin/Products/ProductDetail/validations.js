import * as yup from 'yup'

const validations = yup.object().shape({
    productName: yup
    .string()
    .required("Zorunlu Bir Alan"),
    unitPrice: yup
    .string()
    .required("Zorunlu Bir Alan"),
    unitsInStock: yup
    .string()
    .required("Zorunlu Bir Alan"),
    description: yup
    .string()
    .required("Zorunlu Bir Alan")
})

export default validations;