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
    incentiveStatus: Yup.string().required("IncentiveStatus is required"),
});



export const celebrityValitionSchema = Yup.object().shape({
    celebrityName: Yup.string().required("Celebrity name is required"),
    celebrityGender: Yup.string().required("Celebrity gender is required"),
    celebrityProfession: Yup.string().required("Profession/Nationality is required"),
    celebrityStatus: Yup.boolean().required("Celebrity status is required"),
    // celebrityImage: Yup.string().required("Image is required"), 
});

export const musicValidationSchema = Yup.object({
    // musicName: Yup.string().required('Music name is required'),
    musicStatus: Yup.boolean().required('MusicStatus is required'),
    // musicFile: Yup.mixed().nullable(),
});