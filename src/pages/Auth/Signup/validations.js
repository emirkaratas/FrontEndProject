import * as yup from 'yup'

const validations = yup.object().shape({
    email: yup
    .string()
    .email("Geçerli Bir Mail Giriniz")
    .required("Zorunlu Bir Alan"),
    password: yup
    .string()
    .min(6,"Parolanız En Az 6 Karakter Olmalıdır")
    .required("Zorunlu Bir Alan")
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "Büyük Harf Bulunmalıdır, Küçük Harf Bulunmalıdır, Rakam ve Özel Karakter İçermelidir"
      ),
    passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")],"Parolalar Aynı Değil!")
    .required("Zorunlu Bir Alan"),
    firstName: yup
    .string()
    .required("Zorunlu Bir Alan"),
    lastName: yup
    .string()
    .required("Zorunlu Bir Alan")
})

export default validations;