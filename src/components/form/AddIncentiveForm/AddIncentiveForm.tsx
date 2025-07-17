import { Formik, Form, FormikHelpers, ErrorMessage } from 'formik';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import Button from '../../ui/button/Button';
import Spinner from '../../ui/spinner/Spinner';
import CustomDropdown from '../../reusableComponents/CustomDropdown';
import { useAuth } from '../../../context/AuthContext';
import { addIncentivesApi, exportCsvIncentivesApi, uploadCsvIncentivesApi } from '../../../../services/incentives';
import { AddIncentivesValues } from '../../../interface';
import { inceltivesValitionSchema } from '../../../validations';
import { useDropzone } from 'react-dropzone';
import ToggleSwitchButton from '../../reusableComponents/ToggleSwitchButton';
import { genderOptions, incentivesMoodOptions, incentivesNatureOptions } from '../../../data';
 
const MAX_CHAR_LIMIT = 350;

interface AddIncentiveFormProps {
    editingData?: AddIncentivesValues | null;
    onEditSubmit?: (data: AddIncentivesValues) => void;
    editLoading: boolean;
    setEditData: React.Dispatch<React.SetStateAction<AddIncentivesValues | null>>;
    setActiveAccordion: React.Dispatch<React.SetStateAction<string | null>>;
    activeAccordion: string | null;
    toggleAccordion: (accordion: string) => void;
    fetchIncentives: () => Promise<void>;
    formRef: React.RefObject<HTMLDivElement | null>
};



const AddIncentiveForm: React.FC<AddIncentiveFormProps> = ({
    editingData = null,
    onEditSubmit,
    editLoading,
    setEditData,
    activeAccordion,
    toggleAccordion,
    fetchIncentives,
    formRef
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [bulkloading, setBulkLoading] = useState<boolean>(false);
    const { setAddIncentivesFormData } = useAuth();

    const handleSubmit = async (
        values: AddIncentivesValues,
        { resetForm }: FormikHelpers<AddIncentivesValues>
    ) => {
        setLoading(true);
        try {
            if (editingData && onEditSubmit) {
                onEditSubmit({
                    incentives: values.incentives,
                    gender: values.gender,
                    incentivesMood: values.incentivesMood,
                    incentivesNature: values.incentivesNature,
                    incentiveStatus: values.incentiveStatus,
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
            }
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
            const csvFile = acceptedFiles.find((file) => file.name.endsWith(".csv"));
            if (!csvFile) {
                toast.error("Only .csv files are allowed.");
                return;
            }
            setUploadedFile(csvFile);
            setUploadProgress(0);
            // uploadCsvIncentivesApi(
            //     csvFile,
            //     (msg) => {
            //         toast.success(msg);
            //         fetchIncentives();
            //     },
            //     (progress) => {
            //         setUploadProgress(progress);
            //     }
            // );
        },
        multiple: false,
        accept: { "text/csv": [".csv"] },
    });
    const handleUploadCsv = async () => {
        if (!uploadedFile) {
            toast.error("Please upload a CSV file first.");
            return;
        }

        try {
            setBulkLoading(true);
            setUploadProgress(0);
            setAddIncentivesFormData(null);

            await uploadCsvIncentivesApi(
                uploadedFile,
                (msg) => {
                    toast.success(msg);
                    setUploadedFile(null);
                    setUploadProgress(null);
                    fetchIncentives();
                },
                (progress) => {
                    setUploadProgress(progress);
                }
            );
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            console.error("Upload Error:", axiosError);

            const status = axiosError?.response?.status;
            const errorMessages: Record<number, string> = {
                400: "Invalid file format. Please upload a valid CSV file.",
                500: "Server error while uploading CSV.",
            };

            toast.error(
                status && errorMessages[status]
                    ? errorMessages[status]
                    : "Failed to upload CSV. Please try again."
            );
        } finally {
            setBulkLoading(false);
        }
    };



    const exportCsvincentiveHandler = async (): Promise<void> => {
        try {
            await exportCsvIncentivesApi(); // Just call it

            toast.success("Bulk Incentives Successfully Exported ✅");
        } catch (error) {
            const axiosError = error as AxiosError;
            const status = axiosError?.response?.status;

            const errorMessages: Record<number, string> = {
                404: "No incentives found to export.",
                500: "Server error while exporting incentives.",
            };

            toast.error(
                status && errorMessages[status]
                    ? errorMessages[status]
                    : "Failed to export incentives. Please try again."
            );
        }
    };




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
            }) => (
                <Form>
                    <div className="w-full">
                        <div className="bg-[#400F09] py-3 sm:py-4 w-full flex flex-col sm:flex-row justify-between px-4 items-center gap-3">
                            <h1 className="text-lg sm:text-xl font-medium text-white">Incentives Menu</h1>
                            <div className="flex flex-wrap gap-2 sm:gap-4 items-center">
                                <div className="flex space-x-2">
                                    <Button
                                        type="button"
                                        className="w-28 sm:w-32 text-white bg-[#D27639] py-2 text-sm sm:text-base"
                                        onClick={() => toggleAccordion("bulkimport")}
                                    >
                                        Bulk Import
                                    </Button>
                                    <Button
                                        onClick={exportCsvincentiveHandler}
                                        type="button"
                                        className="w-28 sm:w-32 text-white bg-[#B54D40] py-2 text-sm sm:text-base"
                                    >
                                        Export All
                                    </Button>
                                </div>
                                <div className="h-8 sm:h-10 border border-dashed border-[#EF6D22]" />
                                <Button
                                    type="button"
                                    className="w-28 sm:w-32 text-white bg-gradient-to-r from-orange-400 to-red-600 py-2 text-sm sm:text-base"
                                    onClick={() => {
                                        resetForm();
                                        if (editingData) setEditData(null);
                                        toggleAccordion("addnew");
                                    }}
                                >
                                    Add New
                                </Button>
                            </div>
                        </div>

                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeAccordion === "addnew" ? "max-h-[1000px] border border-dashed border-red-300" : "max-h-0"}`}>
                            <div className="p-4 bg-[#FFF9F4]">
                                <div className="flex flex-col sm:flex-row w-full justify-between gap-4">
                                    <div className="w-full sm:w-1/2">
                                        <p className="text-[#400F09] font-medium mb-2 text-sm sm:text-base">Write Incentive</p>
                                        <textarea
                                            className="w-full h-48 sm:h-60 px-4 py-3 border border-orange-400 resize-none outline-none placeholder:text-gray-500 text-sm sm:text-base"
                                            placeholder="Please type incentives here"
                                            name="incentives"
                                            value={values.incentives}
                                            onChange={(e) => setFieldValue("incentives", e.target.value)}
                                            maxLength={MAX_CHAR_LIMIT}
                                            style={{ verticalAlign: "top" }}
                                        />
                                        <div className="flex items-center mt-1">
                                            {errors.incentives && touched.incentives ? (
                                                <div className="text-sm text-red-500">
                                                    <ErrorMessage name="incentives" />
                                                </div>
                                            ) : <div className="h-4" />}
                                            <p className="ml-auto text-xs sm:text-sm text-[#767883]">
                                                {MAX_CHAR_LIMIT - values.incentives.length} Characters Left
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-full sm:w-1/2 flex flex-col gap-2 sm:gap-3">
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
                                            errorClassName="h-6 text-sm"
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
                                            errorClassName="h-6 text-sm"
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
                                            errorClassName="h-6 text-sm"
                                        />
                                    </div>
                                </div>


                                <div className="flex flex-col sm:flex-row justify-between space-x-0 sm:space-x-6 px-4 items-center pb-8 mt-4">
                                    <ToggleSwitchButton
                                        value={values.incentiveStatus}
                                        onChange={(val) => setFieldValue('incentiveStatus', val)}
                                        label={values.incentiveStatus ? 'Active' : "Inactive"}
                                        className="w-10 h-5 flex items-center rounded-full cursor-pointer transition-colors duration-300 "
                                        classNameKnob="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 "
                                    />
                                    <div className="flex gap-2 mt-4 sm:mt-0">
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                resetForm();
                                                if (editingData) setEditData(null);
                                                toggleAccordion("addnew");
                                                setTimeout(() => {
                                                    formRef.current?.scrollIntoView({ behavior: "smooth" });
                                                }, 100);
                                            }}
                                            className="w-28 sm:w-32 bg-gray-300 text-gray-700 text-sm sm:text-base"
                                            size="sm"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            onClick={submitForm}
                                            className="w-28 sm:w-32 bg-gradient-to-r from-orange-600 to-orange-400 text-white flex items-center justify-center text-sm sm:text-base"
                                            size="sm"
                                            disabled={isSubmitting || loading || editLoading}
                                        >
                                            {(loading || editLoading) ? (
                                                <>
                                                    <Spinner />
                                                    <span>{editingData ? "Updating..." : "Saving..."}</span>
                                                </>
                                            ) : (
                                                <>
                                                    {/* <Spinner /> */}
                                                    <span>{editingData ? "Update" : "Save"}</span>
                                                </>
                                            )}
                                        </Button>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeAccordion === "bulkimport" ? "max-h-[1000px] border border-dashed border-red-300" : "max-h-0"}`}>
                            <div className="p-4 bg-[#FFF9F4]">


                                <div className="flex flex-col sm:flex-row w-full gap-4 border border-orange-500 rounded">
                                    <div className="w-full sm:w-1/2 bg-[#A84317] text-white p-4 sm:p-6 space-y-2">
                                        <h2 className="text-white text-base sm:text-lg mb-2">Read the instructions carefully to create a File for BULK UPLOAD incentives.</h2>
                                        <ol className="list-decimal list-inside text-xs sm:text-sm space-y-1 marker:text-[#FF9B61]">
                                            <li>
                                                Download Sample File{" "}
                                                <a
                                                    href="https://api.fameoflame.com/samplefamoflameIncentives.csv"
                                                    download
                                                    className="ml-2 bg-[#CC5A18] text-[#FFCAA7] text-xs px-2 py-[2px] rounded"
                                                >
                                                    Click Here
                                                </a>
                                            </li>
                                            <li>Put the Data in appropriate columns as specified in Sample File.</li>
                                            <li>Add only Incentives on your own, otherwise simply copy the data from the file.</li>
                                            <li>Do not change the File Type at all.</li>
                                            <li>Finally, upload the File here after inserting all the incentives.</li>
                                            <li>That's it! You can now edit the incentives in Bulk or individually using the Web App.</li>
                                        </ol>
                                    </div>

                                    <div className="w-full sm:w-1/2 p-4 sm:p-6">
                                        <div {...getRootProps()} className="border-2 border-dashed border-orange-400 rounded cursor-pointer p-4 sm:p-6 text-center">
                                            <input {...getInputProps()} />
                                            <div className="flex flex-col items-center space-y-2">
                                                {
                                                    uploadedFile ?

                                                        <p className="text-orange-600 font-semibold text-sm sm:text-base">File: {uploadedFile.name} Uploaded</p>

                                                        :
                                                        <>
                                                            <img src="/images/uploadIcon.svg" alt="upload" className="w-8 h-8 sm:w-10 sm:h-10" />
                                                            <p className="text-orange-600 font-semibold text-sm sm:text-base">Drag & Drop or Choose File to Upload</p>
                                                            <p className="text-gray-500 text-xs sm:text-sm">
                                                                File accepted: <strong>.csv</strong> only <br />
                                                                Example: incentives.csv <br />
                                                            </p>
                                                            <span className="text-orange-500 underline text-sm">Browse</span>
                                                        </>
                                                }
                                            </div>
                                        </div>


                                        {uploadedFile && (
                                            <div className="mt-4 bg-white p-3 rounded border border-gray-300 shadow-sm">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <img src="/images/csvIcon.png" alt="csv" className="w-6 h-6" />
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-800">{uploadedFile.name}</p>
                                                            <p className="text-xs text-gray-500">
                                                                {(uploadedFile.size / 1024 / 1024).toFixed(1)}mb | {uploadProgress ?? 0}%
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            setUploadedFile(null);
                                                            setUploadProgress(null);
                                                        }}
                                                        className="bg-[#FF9B61] w-6 h-6 rounded flex justify-center items-center"
                                                    >
                                                        <svg width="20" height="20" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M8.36194 2.93435C7.7742 2.8735 7.18645 2.82787 6.59506 2.79365V2.78985L6.51475 2.2955C6.45999 1.94565 6.37967 1.42088 5.52544 1.42088H4.56898C3.7184 1.42088 3.63808 1.92283 3.57967 2.29169L3.50301 2.77844C3.16351 2.80125 2.824 2.82407 2.4845 2.85829L1.73978 2.93435C1.58645 2.94956 1.47694 3.09026 1.49154 3.24617C1.50614 3.40208 1.63756 3.51616 1.79089 3.50095L2.53561 3.4249C4.44851 3.22716 6.37602 3.30321 8.31084 3.50475C8.32179 3.50475 8.32909 3.50475 8.34004 3.50475C8.47876 3.50475 8.59923 3.39447 8.61383 3.24617C8.62479 3.09026 8.51527 2.94956 8.36194 2.93435Z" fill="white" />
                                                            <path d="M7.69071 4.04117C7.6031 3.9461 7.48263 3.89286 7.35851 3.89286H2.74417C2.62005 3.89286 2.49593 3.9461 2.41196 4.04117C2.328 4.13623 2.28054 4.26552 2.28784 4.39862L2.51418 8.30018C2.55434 8.87819 2.60545 9.60071 3.8795 9.60071H6.22318C7.49723 9.60071 7.54834 8.882 7.5885 8.30018L7.81483 4.40242C7.82213 4.26552 7.77468 4.13623 7.69071 4.04117ZM5.65734 7.69556H4.44169C4.29202 7.69556 4.1679 7.56626 4.1679 7.41035C4.1679 7.25444 4.29202 7.12515 4.44169 7.12515H5.65734C5.80701 7.12515 5.93113 7.25444 5.93113 7.41035C5.93113 7.56626 5.80701 7.69556 5.65734 7.69556ZM5.96399 6.17448H4.13869C3.98902 6.17448 3.8649 6.04519 3.8649 5.88928C3.8649 5.73336 3.98902 5.60407 4.13869 5.60407H5.96399C6.11366 5.60407 6.23778 5.73336 6.23778 5.88928C6.23778 6.04519 6.11366 6.17448 5.96399 6.17448Z" fill="white" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded h-2 mt-2">
                                                    <div
                                                        className="bg-orange-500 h-2 rounded transition-all duration-300 ease-in-out"
                                                        style={{ width: `${uploadProgress ?? 0}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>


                                {/* <div className="flex flex-col sm:flex-row justify-between space-x-0 sm:space-x-6 px-4 items-center pb-8 mt-4"> */}

                                <div className="flex gap-2 mt-4 sm:mt-0 flex-end justify-end py-10">
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            resetForm();
                                            if (editingData) setEditData(null);
                                            toggleAccordion("bulkimport");
                                            setTimeout(() => {
                                                formRef.current?.scrollIntoView({ behavior: "smooth" });
                                            }, 100);
                                        }}
                                        className="w-28 sm:w-32 bg-gray-300 text-gray-700 text-sm sm:text-base"
                                        size="sm"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        onClick={handleUploadCsv}
                                        className="w-28 sm:w-32 bg-gradient-to-r from-orange-600 to-orange-400 text-white flex items-center justify-center text-sm sm:text-base"
                                        size="sm"
                                        disabled={bulkloading}
                                    >
                                        {bulkloading ? (
                                            <>
                                                <Spinner />
                                                {'Saving...'}
                                            </>
                                        ) : 'Save'}
                                    </Button>
                                </div>
                                {/* </div> */}


                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AddIncentiveForm;