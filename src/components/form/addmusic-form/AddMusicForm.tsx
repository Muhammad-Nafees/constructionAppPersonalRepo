import { Formik, Form, FormikHelpers } from 'formik';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import { useAuth } from '../../../context/AuthContext';
import { MusicValuesSchema } from '../../../interface';
import { uploadMusicApi } from '../../../../services/music';
import { musicValidationSchema } from '../../../validations';
import Button from '../../../components/ui/button/Button';
import ToggleSwitchButton from '../../../components/reusableComponents/ToggleSwitchButton';
import Spinner from '../../../components/ui/spinner/Spinner';

interface AddMusicFormProps {
  fetchMusic: () => Promise<void>;
  activeAccordion: string | null;
  setActiveAccordion: React.Dispatch<React.SetStateAction<string | null>>;
  toggleAccordion: (accordion: string) => void;
}

const AddMusicForm: React.FC<AddMusicFormProps> = ({
  fetchMusic,
  activeAccordion,
  toggleAccordion,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { setAddIncentivesFormData } = useAuth();

  const singleDropzone = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file && file.size > 12 * 1024 * 1024) {
        toast.error("File size exceeds 12MB limit.");
        return;
      }
      setSelectedFile(file);
    },
    multiple: false,
    accept: { 'audio/*': ['.mp3', '.wav'] },
  });



  const handleSubmit = async (
    values: MusicValuesSchema,
    { resetForm }: FormikHelpers<MusicValuesSchema>
  ) => {
    if (!selectedFile) {
      toast.error("Please select a music file.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      // formData.append('musicName', selectedFile.name.split('.')[0]); // Set from file
      formData.append('musicStatus', values.musicStatus.toString());
      formData.append('music', selectedFile);

      const response = await uploadMusicApi(formData);
      toast.success('Music added successfully');
      setAddIncentivesFormData(response.data);
      resetForm();
      setSelectedFile(null);
      fetchMusic();
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };


  return (
    <Formik
      enableReinitialize
      initialValues={{
        musicName: '',
        musicStatus: false,
        musicFile: null,
      }}
      validationSchema={musicValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, resetForm }) => (
        <Form>
          <div className="w-full">
            <div className="bg-[#400F09] py-3 sm:py-4 w-full flex flex-col sm:flex-row justify-between px-4 items-center gap-3">
              <h1 className="text-lg sm:text-xl font-medium text-white">Music Menu</h1>
              <div className="flex gap-4 items-center">
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
                <div className="flex flex-col sm:flex-row w-full gap-4 border border-orange-500 rounded">
                  <div className="w-full sm:w-1/2 bg-[#A84317] text-white p-4 sm:p-6 space-y-2">
                    <h2 className="text-white text-base sm:text-lg mb-2 text-left">Instructions</h2>
                    <ol className="list-decimal list-inside text-xs sm:text-sm space-y-1 marker:text-[#FF9B61]">
                      <li>Files accepted: <strong>.MP3, .WAV</strong>.</li>
                      <li>File size should be less than 12MB.</li>
                    </ol>
                  </div>

                  <div className="w-full sm:w-1/2 p-4 sm:p-6">
                    <div
                      {...singleDropzone.getRootProps()}
                      className="border-2 border-dashed border-orange-400 rounded cursor-pointer p-4 sm:p-6 text-center"
                    >
                      <input {...singleDropzone.getInputProps()} />
                      <div className="flex flex-col items-center space-y-2">
                        {selectedFile ? (
                          <p className="text-orange-600 font-semibold text-sm sm:text-base">
                            {selectedFile.name} selected
                          </p>
                        ) : (
                          <>
                            <img
                              src="/images/uploadIcon.svg"
                              alt="upload"
                              className="w-8 h-8 sm:w-10 sm:h-10"
                            />
                            <p className="text-orange-600 font-semibold text-sm sm:text-base">
                              Drag & Drop or Choose Music File to Upload
                            </p>
                            <p className="text-gray-500 text-xs sm:text-sm">
                              File accepted: <strong>.mp3, .wav</strong><br />
                              Max Size: 12MB
                            </p>
                            <span className="text-orange-500 underline text-sm">Browse</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between space-x-0 sm:space-x-6 px-4 items-center py-6 mt-4">
                  <ToggleSwitchButton
                    value={values.musicStatus}
                    onChange={(val) => setFieldValue('musicStatus', val)}
                    label={values.musicStatus ? 'Active' : "Inactive"}
                    className="w-10 h-5 flex items-center rounded-full cursor-pointer transition-colors duration-300 "
                    classNameKnob="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 "
                  />
                  <div className="flex gap-2 mt-4 sm:mt-0">
                    <Button
                      type="button"
                      onClick={() => {
                        resetForm();
                        setSelectedFile(null);
                        toggleAccordion("addnew");
                      }}
                      className="w-28 sm:w-32 bg-gray-300 text-gray-700 text-sm sm:text-base"
                      size="sm"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      onClick={() => {
                        handleSubmit
                      }}
                      disabled={!selectedFile || loading}
                      className="w-28 sm:w-32 bg-gradient-to-r from-orange-600 to-orange-400 text-white flex items-center justify-center text-sm sm:text-base"
                      size="sm"
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

export default AddMusicForm;
