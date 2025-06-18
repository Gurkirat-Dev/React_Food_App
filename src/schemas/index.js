import * as yup from "yup";

export const basicSchema = yup.object().shape({
                    email:yup.string().email("please enter a valid email").required(),
                    name:yup.string().required("Name is required").min(3,"Name must be at least 2 characters"),
                    password:yup.string().required("Password is required").min(6,"password must be at least 6 characters")
})