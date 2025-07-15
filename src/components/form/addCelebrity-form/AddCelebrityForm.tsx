import { Formik, Form, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../ui/button/Button';
import CustomDropdown from '../../reusableComponents/CustomDropdown';
import ImageUploader from './ImageUploader';
import CustomInput from '../../input/CustomInputField';
import { celebrityUploadApi, getCelebritiesApi } from '../../../../services/celebrities';
import { useDropzone } from 'react-dropzone';
import { CelebritiesValuesSchema } from '../../../interface';
import { celebrityValitionSchema } from '../../../validations';
import { useGlobal } from '../../../context/GlobalMainContext';
import ToggleSwitchButton from '../../reusableComponents/ToggleSwitchButton';
import { incentivesMoodOptions, incentivesNatureOptions } from '../../../data';

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

interface AddCelebrityFormProps {
    // editingData?: AddIncentivesValues | null;
    // onEditSubmit?: (data: AddIncentivesValues) => void;
    // editLoading: boolean;
    // setEditData: React.Dispatch<React.SetStateAction<AddIncentivesValues | null>>;
    // setActiveAccordion: React.Dispatch<React.SetStateAction<string | null>>;
    // activeAccordion: string | null;
    // toggleAccordion: (accordion: string) => void;
    // fetchIncentives: () => Promise<void>;
    toggleAccordion: (accordion: string) => void;
    activeAccordion: string | null;
};

const AddCelebrityForm = ({
    toggleAccordion,
    activeAccordion
}: AddCelebrityFormProps) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);

    const [celebritiesApiResponse, setCelebritiesApiResponse] = useState([]);
    const { setCelebritiesDataContext } = useGlobal();
    console.log(" AddCelebrityForm ~ selectedFiles:", selectedFiles);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            const maxSize = 1048576; // 1MB
            const validFiles = acceptedFiles.filter((file) => {
                if (file.size <= maxSize) {
                    return true;
                } else {
                    toast.error(`${file.name} is larger than 1MB and was not added.`);
                    return false;
                }
            });
            setSelectedFiles(validFiles);
        },
        multiple: true,
        accept: {
            'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif']
        },
    });



    const handleSubmit = async (values: CelebritiesValuesSchema, { setFieldValue, resetForm }: any) => {
        if (selectedFiles.length === 0) return;
        setUploading(true);

        try {
            const response = await celebrityUploadApi(
                selectedFiles,
                values,
                (url: string) => setFieldValue('celebrityImage', url),
                setProgress
            );
            setCelebritiesApiResponse(response);
            resetForm();
            setSelectedFiles([]);
            console.log('Upload success:', response);
        } catch (error) {
            console.error('Upload failed', error);
        } finally {
            setUploading(false);
        }
    };



    const getCelebritiesHandler = async () => {
        try {
            const response = await getCelebritiesApi();
            setCelebritiesDataContext(response);
            console.log("getCelebritiesHandler ~ response:", response)
            return response;
        } catch (error) {
            console.log("🚀 ~ getCelebritiesHandler ~ error:", error)
            throw error;
        }
    };



    useEffect(() => {
        getCelebritiesHandler();
    }, [celebritiesApiResponse]);


    // getCelebrities

    return (
        <Formik
            initialValues={{
                celebrityImage: 'clebrityimage',
                celebrityName: '',
                celebrityGender: '',
                celebrityProfession: '',
                celebrityStatus: false
            }}
            enableReinitialize={false}
            validationSchema={celebrityValitionSchema}
            onSubmit={handleSubmit}
        >

            {({ values, errors, touched, setFieldValue, resetForm, submitForm }) => (
                // <Form>
                //     <div className="mt-10 space-y-4">
                //         <h1 className="text-xl font-medium">Upload Your Celebrity Image</h1>

                //         <ImageUploader
                //             getRootProps={getRootProps}
                //             getInputProps={getInputProps}
                //             values={values}
                //             error={errors.celebrityImage}
                //             touched={touched.celebrityImage}
                //             name="celebrityImage"
                //             errorClassName="h-4"
                //             selectedFiles={selectedFiles}
                //         //   onUploadSuccess={(url) => setFieldValue('celebrityImage', url)}
                //         />

                //         <CustomInput
                //             label="Celebrity Name"
                //             name="celebrityName"
                //             value={values.celebrityName}
                //             onChange={(e) => setFieldValue('celebrityName', e.target.value)}
                //             placeholder="Enter Celebrity Name"
                //             error={errors.celebrityName}
                //             touched={touched.celebrityName}
                //         />

                //         <div className="flex gap-4">
                //             <CustomDropdown
                //                 label="Gender"
                //                 options={genderOptions}
                //                 values={values.celebrityGender}
                //                 onSelect={(val) => setFieldValue('celebrityGender', val)}
                //                 className="w-1/2"
                //                 placeholder="Select Gender"
                //                 error={errors.celebrityGender}
                //                 touched={touched.celebrityGender}
                //                 name="celebrityGender"
                //                 errorClassName="h-4"
                //             />

                //             <CustomDropdown
                //                 label="Profession/Nationality"
                //                 options={professionOptions}
                //                 values={values.celebrityProfession}
                //                 onSelect={(val) => setFieldValue('celebrityProfession', val)}
                //                 className="w-1/2"
                //                 placeholder="Select Profession"
                //                 error={errors.celebrityProfession}
                //                 touched={touched.celebrityProfession}
                //                 name="celebrityProfession"
                //                 errorClassName="h-4"
                //             />
                //         </div>



                //         <div className="flex justify-end space-x-4">
                //             <Button
                //                 type="button"
                //                 onClick={() => resetForm()}
                //                 className="w-32 bg-gray-300 text-gray-700"
                //                 size="sm"
                //             >
                //                 Cancel
                //             </Button>

                //             <Button
                //                 type="submit"
                //                 onClick={submitForm}
                //                 className="w-32 bg-gradient-to-r from-orange-600 to-orange-400 text-white"
                //                 size="sm"
                //                 disabled={uploading || selectedFiles.length === 0}
                //             >
                //                 {uploading ? `Uploading... ${progress}%` : 'Save'}
                //             </Button>
                //         </div>

                //         <div className="w-full bg-[#9D968D] h-0.5 my-10" />
                //     </div>
                // </Form>
                <Form>
                    <div className="w-full">
                        <div className="bg-[#400F09] py-3 sm:py-4 w-full flex flex-col sm:flex-row justify-between px-4 items-center gap-3">
                            <h1 className="text-lg sm:text-xl font-medium text-white">Celebrities Menu</h1>
                            <div className="flex flex-wrap gap-2 sm:gap-4 items-center">
                                <div className="flex space-x-2">
                                    <Button
                                        type="button"
                                        className="w-28 sm:w-32 text-white bg-[#D27639] py-2 text-sm sm:text-base"
                                    // onClick={() => toggleAccordion("bulkimport")}
                                    >
                                        Bulk Import
                                    </Button>
                                    <Button
                                        // onClick={exportCsvincentiveHandler}
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
                                // onClick={() => {
                                //     resetForm();
                                //     if (editingData) setEditData(null);
                                //     toggleAccordion("addnew");
                                // }}
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
                                        {/* <textarea
                                        className="w-full h-48 sm:h-60 px-4 py-3 border border-orange-400 resize-none outline-none placeholder:text-gray-500 text-sm sm:text-base"
                                        placeholder="Please type incentives here"
                                        name="incentives"
                                        value={values.cele}
                                        onChange={(e) => setFieldValue("incentives", e.target.value)}
                                        maxLength={MAX_CHAR_LIMIT}
                                        style={{ verticalAlign: "top" }}
                                    /> */}
                                        {/* <div className="flex items-center mt-1">
                                            {errors.incentives && touched.incentives ? (
                                                <div className="text-sm text-red-500">
                                                    <ErrorMessage name="incentives" />
                                                </div>
                                            ) : <div className="h-4" />}
                                            <p className="ml-auto text-xs sm:text-sm text-[#767883]">
                                                {MAX_CHAR_LIMIT - values.incentives.length} Characters Left
                                            </p>
                                        </div> */}
                                    </div>
                                    <div className="w-full sm:w-1/2 flex flex-col gap-2 sm:gap-3">
                                        <CustomDropdown
                                            label="Gender"
                                            options={genderOptions}
                                            values={values.celebrityGender}
                                            onSelect={(gender) => setFieldValue("celebrityGender", gender)}
                                            className="w-full"
                                            placeholder="Select Gender"
                                            error={errors.celebrityGender}
                                            touched={touched.celebrityGender}
                                            name="gender"
                                            errorClassName="h-6 text-sm"
                                        />
                                        <CustomDropdown
                                            label="Incentives Mood"
                                            options={incentivesMoodOptions}
                                            values={values.celebrityImage}
                                            onSelect={(mood) => setFieldValue("celebrityImage", mood)}
                                            className="w-full"
                                            placeholder="Select Mood"
                                            error={errors.celebrityImage}
                                            touched={touched.celebrityImage}
                                            name="CelebrityName"
                                            errorClassName="h-6 text-sm"
                                        />
                                        <CustomDropdown
                                            label="Incentives Nature"
                                            options={incentivesNatureOptions}
                                            values={values.celebrityProfession}
                                            onSelect={(nature) => setFieldValue("celebrityProfession", nature)}
                                            placeholder="Select Nature"
                                            error={errors.celebrityProfession}
                                            touched={touched.celebrityProfession}
                                            name="incentivesNature"
                                            errorClassName="h-6 text-sm"
                                        />
                                    </div>
                                </div>


                                <div className="flex flex-col sm:flex-row justify-between space-x-0 sm:space-x-6 px-4 items-center pb-8 mt-4">
                                    <ToggleSwitchButton
                                        value={values.celebrityStatus}
                                        onChange={(val) => setFieldValue('celebrityStatus', val)}
                                        label={values.celebrityStatus ? 'Active' : "Inactive"}
                                        className="w-10 h-5 flex items-center rounded-full cursor-pointer transition-colors duration-300 "
                                        classNameKnob="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 "
                                    />
                                    <div className="flex gap-2 mt-4 sm:mt-0">
                                        <Button
                                            type="button"
                                            // onClick={() => {
                                            //     resetForm();
                                            //     if (editingData) setEditData(null);
                                            // }}
                                            className="w-28 sm:w-32 bg-gray-300 text-gray-700 text-sm sm:text-base"
                                            size="sm"
                                        >
                                            Cancel
                                        </Button>
                                        {/* <Button
                                            type="submit"
                                            onClick={submitForm}
                                            className="w-28 sm:w-32 bg-gradient-to-r from-orange-600 to-orange-400 text-white flex items-center justify-center text-sm sm:text-base"
                                            size="sm"
                                            disabled={isSubmitting || loading || editLoading}
                                        >
                                            {loading || editLoading ? (
                                                <>
                                                    <Spinner />
                                                    {editingData ? 'Updating...' : 'Saving...'}
                                                </>
                                            ) : editingData ? 'Update' : 'Save'}
                                        </Button> */}
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
                                                    href="http://localhost:8000/samplefamoflameIncentives.csv"
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
                                            {/* <div className="flex flex-col items-center space-y-2">
                                                <img src="/images/uploadIcon.svg" alt="upload" className="w-8 h-8 sm:w-10 sm:h-10" />
                                                <p className="text-orange-600 font-semibold text-sm sm:text-base">Drag & Drop or Choose File to Upload</p>
                                                <p className="text-gray-500 text-xs sm:text-sm">
                                                    File accepted: <strong>.csv</strong> only <br />
                                                    Example: incentives.csv <br />
                                                   
                                                </p>
                                                <span className="text-orange-500 underline text-sm">Browse</span>
                                            </div> */}
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
                                                        // onClick={() => {
                                                        //     setUploadedFile(null);
                                                        //     setUploadProgress(null);
                                                        // }}
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
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AddCelebrityForm;
