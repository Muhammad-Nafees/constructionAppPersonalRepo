import { Formik, Form, FormikHelpers } from 'formik';
import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import Button from '../../ui/button/Button';
import Spinner from '../../ui/spinner/Spinner';
import CustomDropdown from '../../reusableComponents/CustomDropdown';
import CustomInput from '../../input/CustomInputField';
import { useAuth } from '../../../context/AuthContext';
import { celebrityUploadApi, exportCsvCelebritiesApi, multipleCelebrityUploadApi } from '../../../../services/celebrities';
import { CelebritiesValuesSchema } from '../../../interface';
import { celebrityValitionSchema } from '../../../validations';
import { useDropzone } from 'react-dropzone';
import { genderOptions, professionOptions } from '../../../data';

interface AddCelebrityFormProps {
    fetchCelebrities: () => Promise<void>;
    activeAccordion: string | null;
    setActiveAccordion: React.Dispatch<React.SetStateAction<string | null>>;
    toggleAccordion: (accordion: string) => void;
};



const AddCelebrityForm: React.FC<AddCelebrityFormProps> = ({
    fetchCelebrities,
    activeAccordion,
    toggleAccordion,
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [bulkFiles, setBulkFiles] = useState<File[]>([]);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const { setAddIncentivesFormData } = useAuth();

    const singleDropzone = useDropzone({
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file && file.size > 1048576) {
                toast.error("File size exceeds 1MB limit.");
                return;
            }
            setSelectedFile(file);
        },
        multiple: false,
        accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'] },
    });

    const bulkDropzone = useDropzone({
        onDrop: (acceptedFiles) => {
            const validFiles = acceptedFiles.filter((file) => {
                if (file.size > 1048576) {
                    toast.error(`${file.name} exceeds 1MB limit.`);
                    return false;
                }
                return true;
            });
            setBulkFiles(validFiles);
        },
        multiple: true,
        accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'] },
    });

    const handleSubmit = async (
        values: CelebritiesValuesSchema,
        { resetForm }: FormikHelpers<CelebritiesValuesSchema>
    ) => {
        if (!selectedFile) {
            toast.error("Please select an image.");
            return;
        };

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('celebrityName', values.celebrityName);
            formData.append('celebrityGender', values.celebrityGender);
            formData.append('celebrityProfession', values.celebrityProfession);
            formData.append('celebrityStatus', values.celebrityStatus.toString());
            if (selectedFile) {
                formData.append('file', selectedFile);
            };
            
            const response = await celebrityUploadApi(formData);
            toast.success('Celebrity added successfully');
            setAddIncentivesFormData(response.data);
            resetForm();
            setSelectedFile(null);
            fetchCelebrities();
        } catch (err: unknown) {
            const axiosError = err as AxiosError<{ message: string }>;
            toast.error(axiosError.response?.data.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const exportCsvCelebrityHandler = useCallback(async () => {
        try {
            const response = await exportCsvCelebritiesApi();
            if (!response || response.data?.size === 0) {
                toast.warning("Exported file is empty.");
                return;
            }
            toast.success("Celebrities Successfully Exported");
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error("Export Error:", axiosError);
            const status = axiosError?.response?.status;
            const errorMessages: Record<number, string> = {
                404: "No celebrities found to export.",
                500: "Server error while exporting celebrities.",
            };
            toast.error(
                status && errorMessages[status]
                    ? errorMessages[status]
                    : "Failed to export celebrities. Please try again."
            );
        }
    }, []);

    const handleBulkUpload = useCallback(async (values: CelebritiesValuesSchema) => {
        if (bulkFiles.length === 0) {
            toast.error("Please select at least one image for bulk upload.");
            return;
        };

        setLoading(true);
        try {
            const formData = new FormData();
            const entries = bulkFiles.map(file => ({
                celebrityName: file.name.split('.')[0],
                celebrityGender: '',
                celebrityProfession: '',
                celebrityStatus: values.celebrityStatus,

            }));

            bulkFiles.forEach(file => {
                formData.append('files', file);
            });
            formData.append('entries', JSON.stringify(entries));

            await multipleCelebrityUploadApi(formData, (progress) => {
                setUploadProgress(progress);
            });

            toast.success("Bulk celebrities uploaded successfully!");
            setBulkFiles([]);
            fetchCelebrities();
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            const message = axiosError?.response?.data?.message || 'Failed to upload bulk celebrities.';
            toast.error(message);
            console.error("Bulk Upload Error:", axiosError);
        } finally {
            setLoading(false);
            setUploadProgress(null);
        }
    }, [bulkFiles, fetchCelebrities]);



    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                celebrityName: '',
                celebrityGender: '',
                celebrityProfession: '',
                celebrityStatus: false,

            }}
            validationSchema={celebrityValitionSchema}
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
                            <h1 className="text-lg sm:text-xl font-medium text-white">Celebrities Menu</h1>
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
                                        onClick={exportCsvCelebrityHandler}
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
                                        setSelectedFile(null);
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
                                        <p className="text-[#400F09] font-medium mb-2 text-sm sm:text-base">Upload Celebrity Image</p>
                                        <div {...singleDropzone.getRootProps()} className="w-full h-48 sm:h-70 px-4 py-3 border border-orange-400 outline-none text-sm sm:text-base cursor-pointer flex items-center justify-center">
                                            <input {...singleDropzone.getInputProps()} />
                                            <div className="flex flex-col items-center space-y-2 text-center">
                                                <img src="/images/uploadIcon.svg" alt="upload" className="w-8 h-8 sm:w-10 sm:h-10" />
                                                <p className="text-orange-600 font-semibold text-sm sm:text-base">Drag & Drop or Choose File to Upload</p>
                                                <p className="text-gray-500 text-xs sm:text-sm">
                                                    File accepted: <strong>.jpg, .jpeg, .png, .gif, .webp</strong><br />
                                                    Max Size: 1MB
                                                </p>
                                                <span className="text-orange-500 underline text-sm">Browse</span>
                                            </div>
                                        </div>
                                        {selectedFile && (
                                            <div className="mt-4 bg-white p-3 rounded border border-gray-300 shadow-sm">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                    <img src="/images/csvIcon.png" alt="csv" className="w-6 h-6" />
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-800">{selectedFile.name}</p>
                                                            <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(1)}mb</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => setSelectedFile(null)}
                                                        className="bg-[#FF9B61] w-6 h-6 rounded flex justify-center items-center"
                                                    >
                                                        <svg width="20" height="20" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M8.36194 2.93435C7.7742 2.8735 7.18645 2.82787 6.59506 2.79365V2.78985L6.51475 2.2955C6.45999 1.94565 6.37967 1.42088 5.52544 1.42088H4.56898C3.7184 1.42088 3.63808 1.92283 3.57967 2.29169L3.50301 2.77844C3.16351 2.80125 2.824 2.82407 2.4845 2.85829L1.73978 2.93435C1.58645 2.94956 1.47694 3.09026 1.49154 3.24617C1.50614 3.40208 1.63756 3.51616 1.79089 3.50095L2.53561 3.4249C4.44851 3.22716 6.37602 3.30321 8.31084 3.50475C8.32179 3.50475 8.32909 3.50475 8.34004 3.50475C8.47876 3.50475 8.59923 3.39447 8.61383 3.24617C8.62479 3.09026 8.51527 2.94956 8.36194 2.93435Z" fill="white" />
                                                            <path d="M7.69071 4.04117C7.6031 3.9461 7.48263 3.89286 7.35851 3.89286H2.74417C2.62005 3.89286 2.49593 3.9461 2.41196 4.04117C2.328 4.13623 2.28054 4.26552 2.28784 4.39862L2.51418 8.30018C2.55434 8.87819 2.60545 9.60071 3.8795 9.60071H6.22318C7.49723 9.60071 7.54834 8.882 7.5885 8.30018L7.81483 4.40242C7.82213 4.26552 7.77468 4.13623 7.69071 4.04117ZM5.65734 7.69556H4.44169C4.29202 7.69556 4.1679 7.56626 4.1679 7.41035C4.1679 7.25444 4.29202 7.12515 4.44169 7.12515H5.65734C5.80701 7.12515 5.93113 7.25444 5.93113 7.41035C5.93113 7.56626 5.80701 7.69556 5.65734 7.69556ZM5.96399 6.17448H4.13869C3.98902 6.17448 3.8649 6.04519 3.8649 5.88928C3.8649 5.73336 3.98902 5.60407 4.13869 5.60407H5.96399C6.11366 5.60407 6.23778 5.73336 6.23778 5.88928C6.23778 6.04519 6.11366 6.17448 5.96399 6.17448Z" fill="white" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                       
                                    </div>
                                    <div className="w-full sm:w-1/2 flex flex-col gap-2 sm:gap-3">
                                        <CustomInput
                                            label="Celebrity Name"
                                            name="celebrityName"
                                            value={values.celebrityName}
                                            onChange={(e) => setFieldValue('celebrityName', e.target.value)}
                                            placeholder="Enter Celebrity Name"
                                            error={errors.celebrityName}
                                            touched={touched.celebrityName}
                                        />
                                        <CustomDropdown
                                            label="Gender"
                                            options={genderOptions}
                                            values={values.celebrityGender}
                                            onSelect={(gender) => setFieldValue("celebrityGender", gender)}
                                            className="w-full"
                                            placeholder="Select Gender"
                                            error={errors.celebrityGender}
                                            touched={touched.celebrityGender}
                                            name="celebrityGender"
                                            errorClassName="h-6 text-sm"
                                        />
                                        <CustomDropdown
                                            label="Profession/Nationality"
                                            options={professionOptions}
                                            values={values.celebrityProfession}
                                            onSelect={(profession) => setFieldValue("celebrityProfession", profession)}
                                            className="w-full"
                                            placeholder="Select Profession"
                                            error={errors.celebrityProfession}
                                            touched={touched.celebrityProfession}
                                            name="celebrityProfession"
                                            errorClassName="h-6 text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-end space-x-0 sm:space-x-6 px-4 items-center pb-8 mt-4">
                                    {/* <ToggleSwitchButton
                                        value={values.celebrityStatus}
                                        onChange={(val) => setFieldValue('celebrityStatus', val)}
                                        label={values.celebrityStatus ? 'Active' : "Inactive"}
                                        className="w-10 h-5 flex items-center rounded-full cursor-pointer transition-colors duration-300"
                                        classNameKnob="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300"
                                    /> */}
                                    <div className="flex gap-2 mt-4 sm:mt-0">
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                resetForm();
                                                setSelectedFile(null);
                                                setBulkFiles([]);
                                                setUploadProgress(null);
                                                toggleAccordion("addnew");
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
                                            disabled={isSubmitting || loading || uploadProgress !== null || !selectedFile}
                                        >
                                            {loading ? (
                                                <>
                                                    <Spinner />
                                                    Saving...
                                                </>
                                            ) : 'Save'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeAccordion === "bulkimport" ? "max-h-[1000px] border border-dashed border-red-300" : "max-h-0"}`}>
                            <div className="p-4 bg-[#FFF9F4]">
                                <div className="flex flex-col sm:flex-row w-full gap-4 border border-orange-500 rounded">
                                    <div className="w-full sm:w-1/2 bg-[#A84317] text-white p-4 sm:p-6 space-y-2">
                                        <h2 className="text-white text-base sm:text-lg mb-2">Read the instructions carefully before uploading celebrities.</h2>
                                        <ol className="list-decimal list-inside text-xs sm:text-sm space-y-1 marker:text-[#FF9B61]">
                                            <li>Use the image Size as 1000 x 1000 pixels or 1:1 (Square).</li>
                                            <li>Each file size should be less than 1MB.</li>
                                            <li>Files accepted: .jpg, .jpeg, .png, .gif, .webp.</li>
                                            <li>Ensure all fields are filled correctly.</li>
                                            <li>After uploading, you can view and manage the celebrities in the Celebrities section.</li>
                                            <li>Click on the "Add New" button to add more celebrities.</li>
                                            <li>That's it! Your images are now available in the App.</li>
                                        </ol>
                                    </div>
                                    <div className="w-full sm:w-1/2 p-4 sm:p-6">
                                        <div
                                            {...bulkDropzone.getRootProps()}
                                            className="border-2 border-dashed border-orange-400 rounded cursor-pointer p-4 sm:p-6 text-center"
                                        >
                                            <input {...bulkDropzone.getInputProps()} />
                                            <div className="flex flex-col items-center space-y-2">
                                                {bulkFiles.length > 0 ? (
                                                    <p className="text-orange-600 font-semibold text-sm sm:text-base">
                                                        {bulkFiles.length} Image{bulkFiles.length > 1 ? "s" : ""} Uploaded
                                                    </p>
                                                ) : (
                                                    <>
                                                        <img
                                                            src="/images/uploadIcon.svg"
                                                            alt="upload"
                                                            className="w-8 h-8 sm:w-10 sm:h-10"
                                                        />
                                                        <p className="text-orange-600 font-semibold text-sm sm:text-base">
                                                            Drag & Drop or Choose Files to Upload
                                                        </p>
                                                        <p className="text-gray-500 text-xs sm:text-sm">
                                                            File accepted: <strong>.jpg, .jpeg, .png, .gif, .webp</strong><br />
                                                            Max Size: 1MB
                                                        </p>
                                                        <span className="text-orange-500 underline text-sm">Browse</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>


                                        {bulkFiles.length > 0 && (
                                            <div className="mt-4 bg-white p-3 rounded border border-gray-300 shadow-sm">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <img src="/images/csvIcon.png" alt="csv" className="w-6 h-6" />
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-800">
                                                                {bulkFiles.length} file{bulkFiles.length > 1 ? "s" : ""} selected
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                Total Size: {(bulkFiles.reduce((acc, file) => acc + file.size, 0) / 1024 / 1024).toFixed(2)} MB
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            setBulkFiles([]);
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

                                <div className="flex flex-col sm:flex-row flex-end justify-end space-x-0 sm:space-x-6 px-4 items-center py-6 mt-4">

                                    <div className="flex gap-2 mt-4 sm:mt-0">
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                resetForm();
                                                setBulkFiles([]);
                                                setUploadProgress(null);
                                                toggleAccordion("bulkimport");
                                                setSelectedFile(null);
                                            }}
                                            className="w-28 sm:w-32 bg-gray-300 text-gray-700 text-sm sm:text-base"
                                            size="sm"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => handleBulkUpload(values)}
                                            className="w-28 sm:w-32 bg-gradient-to-r from-orange-600 to-orange-400 text-white flex items-center justify-center text-sm sm:text-base"
                                            size="sm"
                                            disabled={loading || bulkFiles.length === 0 || uploadProgress !== null}
                                        >
                                            {loading ? (
                                                <>
                                                    <Spinner />
                                                    Saving...
                                                </>
                                            ) : 'Save'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AddCelebrityForm;