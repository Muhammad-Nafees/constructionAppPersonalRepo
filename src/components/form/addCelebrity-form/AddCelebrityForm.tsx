import { Formik, Form } from 'formik';
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

const AddCelebrityForm = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
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
            console.log('✅Upload success:', response);
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
                celebrityImage: selectedFiles[0]?.name,
                celebrityName: '',
                celebrityGender: '',
                celebrityProfession: '',
            }}
            enableReinitialize
            validationSchema={celebrityValitionSchema}
            onSubmit={handleSubmit}
        >

            {({ values, errors, touched, setFieldValue, resetForm, submitForm }) => (
                <Form>
                    <div className="mt-10 space-y-4">
                        <h1 className="text-xl font-medium">Upload Your Celebrity Image</h1>

                        <ImageUploader
                            getRootProps={getRootProps}
                            getInputProps={getInputProps}
                            values={values}
                            error={errors.celebrityImage}
                            touched={touched.celebrityImage}
                            name="celebrityImage"
                            errorClassName="h-4"
                            selectedFiles={selectedFiles}
                        //   onUploadSuccess={(url) => setFieldValue('celebrityImage', url)}
                        />

                        <CustomInput
                            label="Celebrity Name"
                            name="celebrityName"
                            value={values.celebrityName}
                            onChange={(e) => setFieldValue('celebrityName', e.target.value)}
                            placeholder="Enter Celebrity Name"
                            error={errors.celebrityName}
                            touched={touched.celebrityName}
                        />

                        <div className="flex gap-4">
                            <CustomDropdown
                                label="Gender"
                                options={genderOptions}
                                values={values.celebrityGender}
                                onSelect={(val) => setFieldValue('celebrityGender', val)}
                                className="w-1/2"
                                placeholder="Select Gender"
                                error={errors.celebrityGender}
                                touched={touched.celebrityGender}
                                name="celebrityGender"
                                errorClassName="h-4"
                            />

                            <CustomDropdown
                                label="Profession/Nationality"
                                options={professionOptions}
                                values={values.celebrityProfession}
                                onSelect={(val) => setFieldValue('celebrityProfession', val)}
                                className="w-1/2"
                                placeholder="Select Profession"
                                error={errors.celebrityProfession}
                                touched={touched.celebrityProfession}
                                name="celebrityProfession"
                                errorClassName="h-4"
                            />
                        </div>



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
                                className="w-32 bg-gradient-to-r from-orange-600 to-orange-400 text-white"
                                size="sm"
                                disabled={uploading || selectedFiles.length === 0}
                            >
                                {uploading ? `Uploading... ${progress}%` : 'Save'}
                            </Button>
                        </div>

                        <div className="w-full bg-[#9D968D] h-0.5 my-10" />
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AddCelebrityForm;
