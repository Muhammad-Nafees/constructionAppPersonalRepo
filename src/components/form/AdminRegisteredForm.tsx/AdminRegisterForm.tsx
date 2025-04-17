import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ComponentCard from '../../common/ComponentCard';
import Label from '../Label';
import Input from '../input/InputField';
import { EyeCloseIcon, EyeIcon } from '../../../icons';
import Button from '../../ui/button/Button';
import Spinner from '../../ui/spinner/Spinner';
import { useState } from 'react';
import { createAdmin } from '../../../../services/admin';
import { ICreateAdminValues } from '../../../interface';
import { useAuth } from '../../../context/AuthContext';

const SubAdminSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});



const AdminRegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { setAdminRegisterFormData } = useAuth()


    const handleSubmit = async (values: ICreateAdminValues) => {
        console.log("🚀 ~ handleSubmit ~ values:", values)
        // setLoading(true)
        try {
            const response = await createAdmin(values);
            setAdminRegisterFormData(response.data);
            // setLoading(false);
            console.log("🚀 ~ create ~ response:", response);
            return response;

        } catch (error) {
            // setLoading(false);
            alert(error?.response?.data?.message)
            console.log("🚀 ~ handleSubmit ~ error:", error)
            throw error;
        }
    };



    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                password: '',
            }}
            validationSchema={SubAdminSchema}
            onSubmit={handleSubmit}
        >
            {({ handleSubmit, isSubmitting, values, setFieldValue, submitForm }) => (
                <Form onSubmit={handleSubmit}>
                    <ComponentCard className="w-[100%]" title="Create Sub admin">
                        <div className="space-y-6 flex space-x-4 item-center">
                            {/* Name */}
                            <div className="w-[33.5%]">
                                <Label htmlFor="name">Name</Label>
                                <Field name="name">
                                    {({ field }: any) => <Input type="text" id="name" {...field} />}
                                </Field>
                                <ErrorMessage name="name">
                                    {(msg) => <p className="text-red-500 text-sm mt-1">{msg}</p>}
                                </ErrorMessage>
                            </div>

                            {/* Email */}
                            <div className="w-[33.5%]">
                                <Label htmlFor="email">Email</Label>
                                <Field name="email">
                                    {({ field }: any) => (
                                        <Input
                                            type="text"
                                            id="email"
                                            placeholder="info@gmail.com"
                                            {...field}
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name="email">
                                    {(msg) => <p className="text-red-500 text-sm mt-1">{msg}</p>}
                                </ErrorMessage>
                            </div>

                            {/* Password */}
                            <div className="w-[33.5%]">
                                <Label>Password for sub admin</Label>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        value={values.password}
                                        onChange={(e) => setFieldValue('password', e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                                    >
                                        {showPassword ? (
                                            <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                                        ) : (
                                            <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                                        )}
                                    </button>
                                    <ErrorMessage name="password">
                                        {(msg) => <p className="text-red-500 text-sm mt-1">{msg}</p>}
                                    </ErrorMessage>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end mt-4">
                            <Button
                                onClick={submitForm}
                                className="w-[8%] flex items-center justify-center"
                                size="sm"
                                disabled={isSubmitting || loading}
                            >
                                {loading ? (
                                    <>
                                        <Spinner />
                                        saving...
                                    </>
                                ) : (
                                    'Save'
                                )}
                            </Button>
                        </div>
                    </ComponentCard>
                </Form>
            )}
        </Formik>
    )
}

export default AdminRegisterForm
