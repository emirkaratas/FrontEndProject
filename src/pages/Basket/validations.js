import * as yup from 'yup'

const validations = yup.object().shape({
    name: yup
        .string()
        .required("Zorunlu Bir Alan"),
    surname: yup
        .string()
        .required("Zorunlu Bir Alan"),
    telNo: yup
        .string()   
        .required("Zorunlu Bir Alan"),
    address: yup
        .string()
        .required("Zorunlu Bir Alan"),
})

export default validations;


