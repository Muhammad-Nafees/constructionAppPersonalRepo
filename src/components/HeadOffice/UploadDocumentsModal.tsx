// components/HeadOffice/UploadDocumentsModal.tsx
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  site: any;
  onClose: () => void;
}

const UploadDocumentsModal = ({ site, onClose }: Props) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const handleUpload = () => {
    toast.success(`${files.length} documents uploaded for ${site.siteName}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold mb-4">Upload Documents - {site.siteName}</h3>
        <div className="border-2 border-dashed rounded-lg p-6 text-center mb-4">
          <input type="file" multiple onChange={handleFileChange} className="hidden" id="doc-upload" />
          <label htmlFor="doc-upload" className="cursor-pointer">
            <div className="text-4xl mb-2">📄</div>
            <p className="text-sm text-gray-500">Click to select documents</p>
          </label>
        </div>
        {files.length > 0 && (
          <div className="space-y-2">
            <p className="font-medium">Selected Files:</p>
            {files.map((file, i) => (
              <div key={i} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded">
                <span>{file.name}</span>
                <span className="text-gray-400">{(file.size / 1024).toFixed(0)} KB</span>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 rounded-lg">Cancel</button>
          <button onClick={handleUpload} className="px-4 py-2 bg-purple-600 text-white rounded-lg">Upload</button>
        </div>
      </div>
    </div>
  );
};

export default UploadDocumentsModal;