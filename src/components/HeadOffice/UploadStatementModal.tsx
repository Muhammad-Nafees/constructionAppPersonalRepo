// components/HeadOffice/UploadStatementModal.tsx
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  onClose: () => void;
   onUpload: (data: any) => void
  accounts: any[]
}

const UploadStatementModal = ({ onClose }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [bankAccount, setBankAccount] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file || !bankAccount) {
      toast.error("Please select bank account and file");
      return;
    }
    toast.success("File uploaded successfully");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-md" 
 
      />
      <div className="absolute inset-0 bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold mb-4">Upload Bank Statement</h3>
        <div className="space-y-4">
          <select
            className="w-full px-4 py-2 border rounded-lg"
            value={bankAccount}
            onChange={(e) => setBankAccount(e.target.value)}
          >
            <option value="">Select Bank Account</option>
            <option value="1">HBL - Head Office Main</option>
            <option value="2">UBL - Project Account</option>
          </select>
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <input type="file" accept=".pdf,.xlsx,.xls" onChange={handleFileChange} className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="text-4xl mb-2">📤</div>
              <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400 mt-1">PDF, Excel (Max 10MB)</p>
            </label>
          </div>
          {file && <p className="text-sm text-green-600">Selected: {file.name}</p>}
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 rounded-lg">Cancel</button>
          <button onClick={handleUpload} className="px-4 py-2 bg-purple-600 text-white rounded-lg">Upload</button>
        </div>
      </div>
    </div>
  );
};

export default UploadStatementModal;