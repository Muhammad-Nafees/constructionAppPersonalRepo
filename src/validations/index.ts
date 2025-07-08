import * as Yup from "yup";

// 👇

export const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

export const inceltivesValitionSchema = Yup.object().shape({
    incentives: Yup.string().required("Incentives are required"),
    gender: Yup.string().required("Gender is required"),
    incentivesMood: Yup.string().required("IncentivesMood is required"),
    incentivesNature: Yup.string().required("IncentivesNature is required"),
});

export const celebrityValitionSchema = Yup.object().shape({
    celebrityName: Yup.string().required("Celebrity name is required"),
    celebrityGender: Yup.string().required("Celebrity gender is required"),
    celebrityProfession: Yup.string().required("Profession/Nationality is required"),
    celebrityImage: Yup.string().required("Image is required"),
});