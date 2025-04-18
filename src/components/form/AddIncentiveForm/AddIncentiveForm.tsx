import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ComponentCard from '../../common/ComponentCard';
import Label from '../Label';
import Input from '../input/InputField';
import Button from '../../ui/button/Button';
import Spinner from '../../ui/spinner/Spinner';
import { useState } from 'react';
import { addIncentivesApi } from '../../../../services/incentives';
import { AddIncentivesPayload } from '../../../interface';
import { useAuth } from '../../../context/AuthContext';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { Dropdown } from '../../ui/dropdown/Dropdown';
import { DropdownItem } from '../../ui/dropdown/DropdownItem';
import CustomDropDown from '../../reusableComponents/CustomDropdown';

const SubAdminSchema = Yup.object().shape({
    incentives: Yup.string().required('incentives is required'),
    category: Yup.string().email('Invalid email').required('Email is required'),
    badnessLevel: Yup.string().required('Password is required'),
});

const AddIncentiveForm = () => {

    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { setAddIncentivesFormData } = useAuth();

    const handleSubmit = async (values: AddIncentivesPayload) => {
        setLoading(true)
        try {
            const response = await addIncentivesApi(values);
            console.log("🚀 ~ handleSubmit ~ response:", response);
            setAddIncentivesFormData(response.data);
            setLoading(false);
            return response;

        } catch (error: unknown) {
            setLoading(false);
            const axiosError = error as AxiosError<{ message: string }>;
            toast(axiosError.response?.data.message || "Something went wrong")
            console.log("🚀 ~ handleSubmit ~ error:", axiosError);
            throw axiosError;
        }
    };

    return (
        <Formik
            key={Date.now()}
            initialValues={{
                incentives: '',
                category: '',
                badnessLevel: '',
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
                                <Label htmlFor="name">Add incentives</Label>
                                {/* <Field name="name" >
                            {({ field }: any) => <Input type="text" id="name" {...field} />}
                        </Field> */}
                                <Input
                                    type="text" id="incentives"
                                    placeholder='Add incentive'
                                    value={values.incentives}
                                    onChange={(e) => setFieldValue('incentives', e.target.value)} />
                                <ErrorMessage name="incentives">
                                    {(msg) => <p className="text-red-500 text-sm mt-1">{msg}</p>}
                                </ErrorMessage>
                            </div>

                            {/* Email */}
                            <div className="w-[33.5%]">

                                {/* <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                </svg>
                                </button>


                                <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                                        </li>
                                    </ul>
                                </div> */}

                                <CustomDropDown
                                    setIsOpen={setIsOpen}
                                    isOpen={isOpen}
                                />

                            </div>

                            {/* Password */}

                            <div className="w-[33.5%]">

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

export default AddIncentiveForm;