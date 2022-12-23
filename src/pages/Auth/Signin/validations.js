import * as yup from 'yup'

const validations = yup.object().shape({
    email: yup
    .string()
    .email("Geçerli Bir Mail Giriniz")
    .required("Zorunlu Bir Alan"),
    password: yup
    .string()
    .min(5,"Parolanız En Az 5 Karakter Olmalıdır")
    .required("Zorunlu Bir Alan"),
})

export default validations;