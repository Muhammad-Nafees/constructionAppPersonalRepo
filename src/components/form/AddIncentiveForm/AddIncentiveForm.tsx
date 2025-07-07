import { Formik, Form, FormikHelpers, ErrorMessage } from 'formik';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';
import Button from '../../ui/button/Button';
import Spinner from '../../ui/spinner/Spinner';
import CustomDropdown from '../../reusableComponents/CustomDropdown';

import { useAuth } from '../../../context/AuthContext';
import { addIncentivesApi } from '../../../../services/incentives';
import { AddIncentivesValues } from '../../../interface';
import { inceltivesValitionSchema } from '../../../validations';
import './AddIncentives.css';

const MAX_CHAR_LIMIT = 350;

const genderOptions = ['Male', 'Female', 'Unisex'];
const incentivesMoodOptions = [
    'Slightly Bad (Less Bad Incentive)',
    'More Bad (Still a Bad Incentive)',
    'Badass (Dirty Incentive)',
    'Ultra Badass (Dark Badass)',
    "I'm a Saint (Good Incentive)",
];
const incentivesNatureOptions = [
    'Celebrities',
    'Players',
    'Unisex',
    'Movies',
    'TV Shows',
    'Holidays',
    'Hobbies',
    'Expenses',
    'Sexual Orientation',
    'Occupation',
];

interface AddIncentiveFormProps {
    editingData?: AddIncentivesValues | null;
    onEditSubmit?: (data: AddIncentivesValues) => void;
    editLoading: boolean;
};



const AddIncentiveForm: React.FC<AddIncentiveFormProps> = ({
    editingData = null,
    onEditSubmit,
    editLoading,
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { setAddIncentivesFormData } = useAuth();

    const handleSubmit = async (
        values: AddIncentivesValues,
        { resetForm }: FormikHelpers<AddIncentivesValues>

    ) => {

        setLoading(true);
        const plainText = values.incentives.replace(/<[^>]+>/g, '');
        try {
            if (editingData && onEditSubmit) {
                onEditSubmit({
                    incentives: plainText,
                    gender: values.gender,
                    incentivesMood: values.incentivesMood,
                    incentivesNature: values.incentivesNature,
                });
            } else {
                const response = await addIncentivesApi({
                    incentives: plainText,
                    gender: values.gender,
                    incentivesMood: values.incentivesMood,
                    incentivesNature: values.incentivesNature,
                });
                toast.success('Incentive added successfully');
                setAddIncentivesFormData(response.data);
                resetForm();
            }
        } catch (err: unknown) {
            const axiosError = err as AxiosError<{ message: string }>;
            toast.error(axiosError.response?.data.message || 'Something went wrong');
            throw axiosError;
        } finally {
            setLoading(false);
        }
    };



    return (
        <Formik
            enableReinitialize
            initialValues={{
                incentives: editingData?.incentives || '',
                gender: editingData?.gender || '',
                incentivesMood: editingData?.incentivesMood || '',
                incentivesNature: editingData?.incentivesNature || '',
            }}
            validationSchema={inceltivesValitionSchema}
            onSubmit={handleSubmit}
        >
            {({
                values,
                touched,
                setFieldValue,
                submitForm,
                resetForm,
                isSubmitting,
                errors,
            }) => {
                const plainText = values.incentives.replace(/<[^>]+>/g, '').trim();
                const charCount = plainText.length;

                return (
                    <Form>
                        <h1 className="text-xl font-medium mb-4">Write Incentives</h1>

                        <div className="quill-wrapper">
                            <ReactQuill
                                theme="snow"
                                value={values.incentives}
                                onChange={(content, delta, source, editor) => {
                                    const plainText = editor.getText().trim();
                                    const charCount = plainText.length;

                                    if (charCount <= MAX_CHAR_LIMIT) {
                                        setFieldValue('incentives', content);
                                    } else {
                                        // Block new characters being typed
                                        const currentText = values.incentives;
                                        setFieldValue('incentives', currentText);
                                    }
                                }}
                                className="custom-quill"
                                placeholder="Start typing here (max 350 characters)"
                            />


                            <div className="flex items-center">
                                {errors.incentives && touched.incentives ? (
                                    <ErrorMessage
                                        name="incentives"
                                        component="div"
                                        className="text-sm text-red-500 pt-1"
                                    />
                                ) : (
                                    <div className="h-4" />
                                )}
                                <p className="ml-auto char-limit">
                                    {charCount} / {MAX_CHAR_LIMIT} Characters
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-10">
                            <CustomDropdown
                                label="Gender"
                                options={genderOptions}
                                values={values.gender}
                                onSelect={(gender) => setFieldValue('gender', gender)}
                                className="w-1/2"
                                placeholder="Select Gender"
                                error={errors.gender}
                                touched={touched.incentivesMood}
                                name="gender"
                                errorClassName="h-4"
                            />

                            <CustomDropdown
                                label="Incentives Mood"
                                options={incentivesMoodOptions}
                                values={values.incentivesMood}
                                onSelect={(incentivesMood) => setFieldValue('incentivesMood', incentivesMood)}
                                className="w-1/2"
                                placeholder="Select Mood"
                                error={errors.incentivesMood}
                                touched={touched.incentivesMood}
                                name="incentivesMood"
                                errorClassName="h-4"
                            />
                        </div>

                        <CustomDropdown
                            label="Incentives Nature"
                            options={incentivesNatureOptions}
                            values={values.incentivesNature}
                            onSelect={(incentivesNature) => setFieldValue('incentivesNature', incentivesNature)}
                            placeholder="Select Nature"
                            error={errors.incentivesNature}
                            touched={touched.incentivesNature}
                            name="incentivesNature"
                            errorClassName="h-4"
                        />

                        <div className="flex justify-end space-x-4">
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
                        </div>

                        <div className="w-full bg-[#9D968D] h-0.5 my-10" />



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

                        {/* {[1, 2, 3].map((i) => (
                                    <CustomDropdown
                                        key={i}
                                        options={incentivesNatureOptions}
                                        values={values.incentivesNature}
                                        onSelect={(val) => setFieldValue('incentivesNature', val)}
                                        placeholder="Select Nature"
                                        error={errors.incentivesNature}
                                        touched={touched.incentivesNature}
                                        name="incentivesNature"
                                        className="flex-1"
                                        errorClassName="h-0"
                                    />
                                ))} */}

                        {/* </div> */}
                        {/* </div> */}


                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddIncentiveForm;