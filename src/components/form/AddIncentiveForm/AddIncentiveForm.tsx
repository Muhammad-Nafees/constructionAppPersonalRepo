import { Formik, Form, FormikHelpers, ErrorMessage, useFormikContext } from 'formik';
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
import { useDropzone } from 'react-dropzone';
import ToggleSwitch from '../form-elements/ToggleSwitch';
import ToggleSwitchButton from '../../reusableComponents/ToggleSwitchButton';

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
    setEditData: React.Dispatch<React.SetStateAction<AddIncentivesValues | null>>
};



const AddIncentiveForm: React.FC<AddIncentiveFormProps> = ({
    editingData = null,
    onEditSubmit,
    editLoading,
    setEditData
}) => {
    console.log("🚀 ~ editingData in addicnetiveform:", editingData)
    const [loading, setLoading] = useState<boolean>(false);
    const [activeAccordion, setActiveAccordion] = useState<string | null>(null);


    const toggleAccordion = (key: string) => {
        setActiveAccordion(activeAccordion === key ? null : key);
    };

    const { setAddIncentivesFormData } = useAuth();

    const handleSubmit = async (
        values: AddIncentivesValues,
        { resetForm }: FormikHelpers<AddIncentivesValues>

    ) => {

        setLoading(true);
        // const plainText = values.incentives.replace(/<[^>]+>/g, '');
        try {
            if (editingData && onEditSubmit) {
                onEditSubmit({
                    incentives: values.incentives,
                    gender: values.gender,
                    incentivesMood: values.incentivesMood,
                    incentivesNature: values.incentivesNature,
                    incentiveStatus: values.incentiveStatus
                    // incentiveStatus:
                });
            } else {

                const response = await addIncentivesApi({
                    incentives: values.incentives,
                    gender: values.gender,
                    incentivesMood: values.incentivesMood,
                    incentivesNature: values.incentivesNature,
                    incentiveStatus: values.incentiveStatus,
                });

                toast.success('Incentive added successfully');
                setAddIncentivesFormData(response.data);
                resetForm();
            };
        } catch (err: unknown) {
            const axiosError = err as AxiosError<{ message: string }>;
            toast.error(axiosError.response?.data.message || 'Something went wrong');
            throw axiosError;
        } finally {
            setLoading(false);
        }
    };



    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            const validFiles = acceptedFiles.filter((file) => {
                if (file.name.endsWith(".csv")) {
                    return true;
                } else {
                    toast.error(`${file.name} is not a CSV file and was not added.`);
                    return false;
                }
            });
            console.log("🚀 ~ validFiles ~ validFiles:", validFiles)
            //   setSelectedFiles(validFiles);
        },
        multiple: false, // Optional: Only 1 file at a time
        accept: {
            'text/csv': ['.csv']
        },
    });



    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                incentives: editingData?.incentives || '',
                gender: editingData?.gender || '',
                incentivesMood: editingData?.incentivesMood || '',
                incentivesNature: editingData?.incentivesNature || '',
                incentiveStatus: editingData?.incentiveStatus ?? false,
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
                // const plainText = values.incentives.re   place(/<[^>]+>/g, '').trim();
                // const charCount = plainText.length;

                return (
                    <Form>
                        {/* <h1 className="text-xl font-medium mb-4">Write Incentives</h1> */}

                        <div className="w-full">
                            {/* Header Section */}
                            <div className="bg-[#400F09] py-4 w-full flex justify-between px-4 items-center ">
                                <h1 className="text-xl font-medium text-white">Incentives Menu</h1>

                                <div className="gap-10 flex items-center">
                                    <div className="flex space-x-2">
                                        <Button
                                            type="button"
                                            className="w-32 text-white bg-[#D27639] py-2"
                                            onClick={() => toggleAccordion("bulkimport")}
                                        >
                                            Bulk Import
                                        </Button>

                                        <Button
                                            type="button"
                                            className="w-32 text-white bg-[#B54D40] py-2"
                                        >
                                            Export All
                                        </Button>
                                    </div>



                                    {/* Dashed Divider */}
                                    <div className="h-10 border border-dashed border-[#EF6D22]" />
                                    <Button
                                        type="button"
                                        className="w-32 text-white bg-gradient-to-r from-orange-400 to-red-600"
                                        onClick={() => toggleAccordion("addnew")}
                                    >
                                        Add New
                                    </Button>

                                </div>
                            </div>



                            {/* Accordion Section - Add New */}
                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${activeAccordion === "addnew"
                                    ? "max-h-[1000px] border border-dashed border-red-300"
                                    : "max-h-0"
                                    }`}
                            >
                                <div className="p-4 bg-[#FFF9F4] flex">
                                    {/* Main Grid with Relative to handle dropdown overflow */}
                                    <div className="flex w-full justify-between gap-4">
                                        <div className='w-1/2'>
                                            <p className="text-[#400F09] font-medium mb-2">Write Incentive</p>
                                            {/* Left Input Box */}
                                            <div className="">
                                                <textarea
                                                    className="w-full h-60 px-4 py-3 border border-orange-400 resize-none outline-none placeholder:text-gray-500"
                                                    placeholder="Start typing the short overview here | Explain Level at a glance here"
                                                    name="incentives"
                                                    value={values.incentives}
                                                    onChange={(e) => {
                                                        setFieldValue("incentives", e.target.value);
                                                    }}
                                                    maxLength={MAX_CHAR_LIMIT}
                                                    style={{ verticalAlign: "top" }}
                                                />

                                                {/* Error & Characters Left */}
                                                <div className="flex items-center mt-1">
                                                    {!errors.incentives && !touched.incentives &&
                                                        <p className='text-sm text-[#DF6022]'>Please type incentives here</p>
                                                    }
                                                    {errors.incentives && touched.incentives ? (
                                                        <div className="text-sm text-[#DF6022]">
                                                            <ErrorMessage name="incentives" />
                                                        </div>
                                                    ) : (
                                                        <div className="h-4" />
                                                    )}
                                                    <p className="ml-auto text-sm text-[#767883]">
                                                        {MAX_CHAR_LIMIT - values.incentives.length} Characters Left
                                                    </p>

                                                </div>
                                            </div>

                                        </div>




                                        {/* Right Dropdowns */}
                                        <div className="w-1/2 flex flex-col gap-2">

                                            <CustomDropdown
                                                label="Gender"
                                                options={genderOptions}
                                                values={values.gender}
                                                onSelect={(gender) => setFieldValue("gender", gender)}
                                                className="w-full"
                                                placeholder="Select Gender"
                                                error={errors.gender}
                                                touched={touched.gender}
                                                name="gender"
                                                errorClassName="text-red-500 h-6"
                                            />

                                            <CustomDropdown
                                                label="Incentives Mood"
                                                options={incentivesMoodOptions}
                                                values={values.incentivesMood}
                                                onSelect={(mood) => setFieldValue("incentivesMood", mood)}
                                                className="w-full"
                                                placeholder="Select Mood"
                                                error={errors.incentivesMood}
                                                touched={touched.incentivesMood}
                                                name="incentivesMood"
                                                errorClassName="text-red-500 h-6"
                                            />

                                            <CustomDropdown
                                                label="Incentives Nature"
                                                options={incentivesNatureOptions}
                                                values={values.incentivesNature}
                                                onSelect={(nature) => setFieldValue("incentivesNature", nature)}
                                                placeholder="Select Nature"
                                                error={errors.incentivesNature}
                                                touched={touched.incentivesNature}
                                                name="incentivesNature"
                                                errorClassName="text-red-500 h-6"
                                            />
                                        </div>

                                    </div>
                                </div>

                                {/* buttons */}
                                <div className="flex justify-between space-x-6 px-4 items-center pb-8" >
                                    <div>
                                        <ToggleSwitchButton
                                            value={values.incentiveStatus}
                                            onChange={(val) => setFieldValue('incentiveStatus', val)}
                                            label={values.incentiveStatus ? 'Active' : "Inactive"}
                                        />
                                    </div>


                                    <div>
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                resetForm();
                                                if (editingData) {
                                                    setEditData(null);
                                                }
                                            }}
                                            className="w-32 bg-gray-300 text-gray-700"
                                            size="sm"
                                        >
                                            Cancel
                                        </Button>

                                        <Button
                                            type="submit"
                                            onClick={submitForm}
                                            className="w-32 bg-gradient-to-r gap-2 from-orange-600 to-orange-400 text-white flex items-center justify-center ml-2"
                                            size="sm"
                                            disabled={isSubmitting || loading || editLoading}
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

                                </div>


                            </div>

                            {/* accordion section - Bulk Import */}

                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${activeAccordion === "bulkimport"
                                    ? "max-h-[1000px] border border-dashed border-red-300"
                                    : "max-h-0"
                                    }`}
                            >
                                <div className="p-4 bg-[#FFF9F4] flex">
                                    {/* Main Grid with Relative to handle dropdown overflow */}
                                    <div className="flex w-full justify-between gap-4">
                                        <div className='w-full'>
                                            <p className="text-[#400F09] font-medium mb-2">Bulk Import</p>
                                            {/* Left Input Box */}

                                            <div {...getRootProps()} className="p-[2px] bg-gradient-to-r from-orange-600 to-orange-400 cursor-pointer border-1 text-center border">
                                                <input {...getInputProps({ multiple: true })} />

                                                <div className="flex flex-col items-center space-y-2 w-full px-4 py-2 text-left bg-[#FFFFFF] py-10">
                                                    <img src="/images/uploadIcon.svg" alt="upload" className="w-10 h-10" />
                                                    <p className="text-orange-600 font-semibold">Drag & Drop or Choose File to Upload</p>
                                                    <p className="text-gray-500 text-sm text-center">
                                                        Files accepted: JPEG, JPG, PNG, GIF, WEBP <br />
                                                        Image should be 1000x1000 pixels or 1:1 ratio <br />
                                                        Max Size: 1MB
                                                    </p>
                                                    <span className="text-orange-500 underline">Browse</span>
                                                </div>
                                            </div>


                                        </div>


                                        {/* Right Dropdowns */}


                                    </div>
                                </div>

                                {/* buttons */}

                            </div>
                        </div>



                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddIncentiveForm;