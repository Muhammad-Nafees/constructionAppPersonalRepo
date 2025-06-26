import * as Yup from "yup";

// 👇

export const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

export const inceltivesValitionSchema = Yup.object().shape({
    incentives: Yup.string().required("Incentives are required"),
    gender: Yup.string().required("Gender is required"),
    incentivesMood: Yup.string().required("Incentive Mood is required"),
    incentivesNature: Yup.string().required("Incentive Nature is required"),
    // password: Yup.string().required("Password is required"),
});
