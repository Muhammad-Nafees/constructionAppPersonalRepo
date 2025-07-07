import { Formik, Form, FormikHelpers, ErrorMessage } from 'formik';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import Button from '../../ui/button/Button';
import Spinner from '../../ui/spinner/Spinner';
import CustomDropdown from '../../reusableComponents/CustomDropdown';
import { useAuth } from '../../../context/AuthContext';

import { celebrityValitionSchema, inceltivesValitionSchema } from '../../../validations';
import ImageUploader from './ImageUploader';



const genderOptions = ['Male', 'Female', 'Unisex'];
const professionOptions = [
    'Politicians',
    'Movie Stars',
    'Porn Stars',
    'Influencers',
    'Musicians',
    'Hispanic',
    'Italian',
    'Asian',
    'French'
];



const AddCelebrityForm = ({
    // editingData = null,
    // onEditSubmit,
    // editLoading,
}) => {
    // const [loading, setLoading] = useState<boolean>(false);
    // const { setAddIncentivesFormData } = useAuth();
    // const [uploadedImage, setUploadedImage] = useState<string>('');
    // const [uploadedFileName, setUploadedFileName] = useState<string>('');

    // const handleSubmit = async (
    //     values: AddIncentivesValues,
    //     { resetForm }: FormikHelpers<AddIncentivesValues>

    // ) => {

    //     setLoading(true);
    //     const plainText = values.incentives.replace(/<[^>]+>/g, '');
    //     try {
    //         if (editingData && onEditSubmit) {
    //             onEditSubmit({
    //                 incentives: plainText,
    //                 gender: values.gender,
    //                 incentivesMood: values.incentivesMood,
    //                 incentivesNature: values.incentivesNature,
    //             });
    //         } else {
    //             const response = await addIncentivesApi({
    //                 incentives: plainText,
    //                 gender: values.gender,
    //                 incentivesMood: values.incentivesMood,
    //                 incentivesNature: values.incentivesNature,
    //             });
    //             toast.success('Incentive added successfully');
    //             setAddIncentivesFormData(response.data);
    //             resetForm();
    //         }
    //     } catch (err: unknown) {
    //         const axiosError = err as AxiosError<{ message: string }>;
    //         toast.error(axiosError.response?.data.message || 'Something went wrong');
    //         throw axiosError;
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleSubmit = () => { }

    return (
        <Formik
            initialValues={{
                celebrityName: '',
                celebrityGender: '',
                profession: '',
                celebrityImage: '',
            }}
            enableReinitialize
            validationSchema={celebrityValitionSchema}
            onSubmit={handleSubmit}
        >
            {({
                values,
                errors,
                touched,
                setFieldValue,
            }) => {
                console.log("🚀 ~ values:", values)
                // const plainText = values.incentives.replace(/<[^>]+>/g, '').trim();
                // const charCount = plainText.length;

                return (
                    <Form>
                        <h1 className="text-xl font-medium mb-4">Upload Your Celebrity Image</h1>
                        <ImageUploader
                            onUploadSuccess={(url) => {
                                setFieldValue('celebrityImage', url);
                                // setUploadedImage(url); // set for preview
                                // setUploadedFileName('Uploaded-Image.jpg'); // dummy, or get from actual file if needed
                            }}
                        />

                        {/* <div className="mt-4">
                            <p className="text-sm text-gray-700 font-medium mb-1">Uploaded Image:</p>
                            <img src={values.celebrityImage} alt="Preview" className="w-32 h-32 object-cover rounded border" />
                            {/* <p className="text-xs mt-1 text-gray-500">{uploadedFileName}</p> */}
                        {/* </div> */}

                        <div className="flex gap-4 mt-10">
                            <CustomDropdown
                                label="Gender"
                                options={genderOptions}
                                values={values.celebrityGender}
                                onSelect={(celebrityGender) => setFieldValue('celebrityGender', celebrityGender)}
                                className="w-1/2"
                                placeholder="Select celebrityGender"
                                error={errors.celebrityGender}
                                touched={touched.celebrityGender}
                                name="celebrityGender"
                                errorClassName="h-4"
                            />

                            <CustomDropdown
                                label="Profession/Nationality"
                                options={professionOptions}
                                values={values.profession}
                                onSelect={(profession) => setFieldValue('profession', profession)}
                                className="w-1/2"
                                placeholder="Select Mood"
                                error={errors.profession}
                                touched={touched.profession}
                                name="profession"
                                errorClassName="h-4"
                            />
                        </div>


                        {/* <CustomDropdown
                            label="Incentives Nature"
                            options={incentivesNatureOptions}
                            values={values.incentivesNature}
                            onSelect={(incentivesNature) => setFieldValue('incentivesNature', incentivesNature)}
                            placeholder="Select Nature"
                            error={errors.incentivesNature}
                            touched={touched.incentivesNature}
                            name="incentivesNature"
                            errorClassName="h-4"
                        /> */}

                        {/* <div className="flex justify-end space-x-4">
                            <Button
                                type="button"
                                onClick={() => resetForm()}
                                className="w-32 bg-gray-300 text-gray-700"
                                size="sm"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                onClick={submitForm}
                                className="w-32 bg-gradient-to-r from-orange-600 to-orange-400 text-white flex items-center justify-center"
                                size="sm"
                                disabled={isSubmitting || loading}
                            >
                                {loading || editLoading ? (
                                    <>
                                        <Spinner />
                                        {editingData ? 'Updating...' : 'Saving...'}
                                    </>
                                ) : (
                                    editingData ? 'Update' : 'Save'
                                )}
                            </Button>
                        </div> */}

                        {/* <div className="w-full bg-[#9D968D] h-0.5 my-10" /> */}



                        {/* <div className="bg-[#FFF6EB] px-6 flex items-center justify-between py-4"> */}
                        {/* <div className="flex space-x-2">
                                <button type="button">
                                    <FilterIcon />
                                </button>
                                <p className="text-black text-lg">Filter</p>
                            </div> */}

                        {/* <div className="flex w-7/12 items-center justify-center space-x-4"> */}
                        {/* <div className="flex-shrink-0 w-1/4 p-[2px] bg-gradient-to-r from-orange-600 to-orange-400">
                                    <div className="flex items-center bg-white overflow-hidden">
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            className="w-full px-4 py-2 focus:outline-none"
                                        />
                                        <button type="button" className="px-3 flex items-center justify-center">
                                            <SearchBarIcon />
                                        </button>
                                    </div>
                                </div> */}

                        {/* </div> */}
                        {/* </div> */}


                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddCelebrityForm;