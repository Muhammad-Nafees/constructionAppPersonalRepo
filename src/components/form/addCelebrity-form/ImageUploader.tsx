import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';

import { ErrorMessage } from 'formik';


interface Props {
    // onUploadSuccess: (url: string, fileName: string) => void;
    multiple?: boolean;
    values: {
        celebrityName: string,
        celebrityGender: string,
        celebrityProfession: string,
        celebrityImage: string
    },
    error: string | undefined;
    touched: boolean | undefined;
    name: string;
    errorClassName: string | undefined;
    getRootProps: () => DropzoneRootProps;
    getInputProps: (options?: { multiple?: boolean }) => DropzoneInputProps;
    selectedFiles: any
};



const ImageUploader: React.FC<Props> = ({
    error,
    touched,
    name,
    errorClassName,
    getInputProps,
    getRootProps,
    selectedFiles
}) => {
    // const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    // const [uploading, setUploading] = useState(false);
    // const [progress, setProgress] = useState(0);

    // Store files in state only, don't upload here
    // const { getRootProps, getInputProps } = useDropzone({
    //     onDrop: (acceptedFiles) => {
    //         const maxSize = 1048576; // 1MB
    //         const validFiles = acceptedFiles.filter((file) => {
    //             if (file.size <= maxSize) {
    //                 return true;
    //             } else {
    //                 toast.error(`${file.name} is larger than 1MB and was not added.`)
    //                 // alert(`${file.name} is larger than 1MB and was not added.`);
    //                 return false;
    //             }
    //         });
    //         console.log("🚀 ~ validFiles ~ validFiles:", validFiles)
    //         setSelectedFiles(validFiles);
    //     },
    //     multiple: multiple,
    //     accept: {
    //         'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif']
    //     },
    // });



    // Call this when button is clicked


    // const handleUpload = async () => {
    //     if (selectedFiles.length === 0) return;

    //     setUploading(true);
    //     try {
    //         const response = await celebrityUploadApi(
    //             selectedFiles,
    //             values,
    //             onUploadSuccess,
    //             setProgress
    //         );
    //         console.log("✅ Upload success:", response);
    //         return response;
    //     } catch (error) {
    //         console.error(" Upload failed", error);
    //     } finally {
    //         setUploading(false);
    //     }
    // };



    return (
        <div className="">
            {/* ✅ Dropzone area */}
            <div {...getRootProps()} className="p-[2px] bg-gradient-to-r from-orange-600 to-orange-400 cursor-pointer border-1 text-center border  rounded">
                <input {...getInputProps({ multiple: true })} />

                <div className="flex flex-col items-center space-y-2 w-full px-4 py-2 text-left bg-[#FFF6EB] py-10">
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

            {/* Show selected files */}
            {selectedFiles?.length > 0 && (
                <ul className="text-sm text-gray-700">
                    {selectedFiles?.map((file: any, idx: any) => (
                        <li key={idx}>📷 {file?.name}</li>
                    ))}
                </ul>
            )}



            {error && touched ? (
                <ErrorMessage
                    name={name}
                    component="div"
                    className="text-sm text-red-500 mt-1"
                />
            ) : (
                <div className={errorClassName} />
            )}

            {/* <button
                type='button'
                onClick={handleUpload}
                className="bg-orange-600 text-white px-6 py-2 rounded disabled:opacity-50"
            // disabled={uploading || selectedFiles.length === 0}
            >
                {uploading ? `Uploading... ${progress}%` : "Upload"}
            </button> */}
        </div>
    );
};

export default ImageUploader;

{/* Upload Button */ }
{/* <button
                onClick={handleUpload}
                className="bg-orange-600 text-white px-6 py-2 rounded disabled:opacity-50"
            // disabled={uploading || selectedFiles.length === 0}
            >
                {uploading ? `Uploading... ${progress}%` : "Upload"}
            </button> */}