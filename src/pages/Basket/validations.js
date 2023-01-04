import * as yup from 'yup'

const validations = yup.object().shape({
    customerFirstName: yup
        .string()
        .required("Zorunlu Bir Alan"),
    customerLastName: yup
        .string()
        .required("Zorunlu Bir Alan"),
    customerPhone: yup
        .string()
        .required("Zorunlu Bir Alan"),
    customerAddress: yup
        .string()
        .required("Zorunlu Bir Alan"),
})

export default validations;


