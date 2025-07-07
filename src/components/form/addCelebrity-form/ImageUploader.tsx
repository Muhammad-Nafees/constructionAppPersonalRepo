import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import { celebrityUploadApi } from "../../../../services/celebrities/index"
import { AxiosResponse } from 'axios';

interface Props {
    onUploadSuccess: (url: string) => void;
    multiple?: boolean;
}

const ImageUploader: React.FC<Props> = ({ onUploadSuccess, multiple = false }) => {
    const [fileName, setFileName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    // const onUploadSuccess = (url: string, file: string) => {
    //   setImageUrl(url);
    //   setFileName(file);
    // };


    const imageUploadHandlerApi = async (acceptedFiles: File[]) => {
        setUploading(true);
        try {
            const response = await celebrityUploadApi(acceptedFiles, onUploadSuccess, setProgress);
            return response;
        } catch (error) {
            console.error("Upload failed", error);
        } finally {
            setUploading(false);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: imageUploadHandlerApi,
        multiple: true, // if you want multiple uploads
    });



    return (
        <div className="border border-orange-400 bg-[#FFF4E6] p-6 rounded">
            <div {...getRootProps()} className="cursor-pointer text-center">
                <input multiple {...getInputProps()} />
                <div className="flex flex-col items-center space-y-2">
                    <img src="/images/uploadIcon.svg" alt="upload" className="w-10 h-10" />
                    <p className="text-orange-600 font-semibold">Drag & Drop or Choose File to Upload</p>
                    <p className="text-gray-500 text-sm">
                        Files accepted: JPEG, JPG, PNG, GIF, WEBp  I  Image should be 1000 x 1000 Pixels
                        <p>
                            or 1:1 aspect ratio  I  The size should be less than or equal to 1MB.
                        </p>
                    </p>
                    <span className="text-orange-500 underline">Browse</span>
                </div>
            </div>

            {uploading && (
                <div className="mt-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">{fileName}</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                        <div
                            className="h-full bg-orange-500 rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}

        </div>
    );
};

export default ImageUploader;