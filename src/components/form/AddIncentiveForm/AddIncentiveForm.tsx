import { Formik, Form } from 'formik';
import ComponentCard from '../../common/ComponentCard';
import Label from '../Label';
import Input from '../input/InputField';
import Button from '../../ui/button/Button';
import Spinner from '../../ui/spinner/Spinner';
import { useState } from 'react';
import { addIncentivesApi } from '../../../../services/incentives';
import { AddIncentivesValues } from '../../../interface';
import { useAuth } from '../../../context/AuthContext';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
// import CustomDropDown from '../../reusableComponents/CustomDropdown';
import { inceltivesValitionSchema } from '../../../validations';
import CustomDropdown from '../../reusableComponents/CustomDropdown';

const AddIncentiveForm = () => {

    const [selectedGender, setSelectedGender] = useState('');
    const [selectedMood, setSelectedMood] = useState('');
    const [selectedNature, setSelectedNature] = useState('');

    const [loading, setLoading] = useState(false);
    //    const {} useAuth()
    const { setAddIncentivesFormData } = useAuth();


    const handleSubmit = async (values: AddIncentivesValues) => {
        setLoading(true);
        try {
            const response = await addIncentivesApi({
                incentives: values.incentives,
                gender: selectedGender,
                incentivesMood: selectedMood,
                incentivesNature: selectedNature
            });

            console.log("🚀 ~ valuesadadadawdavalues0-0-0-0-~ response:", response);
            toast("Incentive added successfully");
            setAddIncentivesFormData(response.data);
            setLoading(false);
            return response;
        } catch (error: unknown) {
            setLoading(false);
            const axiosError = error as AxiosError<{ message: string }>;
            toast(axiosError.response?.data.message || "Something went wrong")
            console.log("🚀 ~ handleSubmit ~ error:", axiosError);
            throw axiosError;
        }
    };



    // Dropdown options data
    const genderOptions = [
        'Male',
        'Female',
        'Unisex'
    ];

    const incentivesMoodOptions = [
        'Slightly Bad (Less Bad Incentive)',
        'More Bad (Still a Bad Incentive)',
        'Badass (Dirty Incentive)',
        'Ultra Badass (Dark Badass)',
        "I'm a Saint (Good Incentive)"
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
        'Occupation'
    ];


    const MAX_CHAR_LIMIT = 300;
    const [isOpen, setIsOpen] = useState(false); // accordion open/close

    const toggleCard = () => setIsOpen((prev) => !prev);

    return (
        <Formik
            initialValues={{
                incentives: "",
                // gender: "",
                // incentivesMood: "",
                // incentivesNature: "",
            }}
            validationSchema={inceltivesValitionSchema}
            onSubmit={handleSubmit}
        >
            {({ handleSubmit, isSubmitting, values, setFieldValue, submitForm }) => (
                console.log("addIncentiveForm ~ values:", values),
                <Form onSubmit={handleSubmit}>

                    {/* <div className="border rounded-lg shadow-md overflow-hidden"> */}
                    {/* Accordion Header */}

                    <ComponentCard
                        title="Add Incentives"
                        className="cursor-pointer transition"
                        onClick={toggleCard}
                        desc="Add incentives for the users. You can add multiple incentives with different moods and natures."
                    >

                        {/* Accordion Content */}

                        <div
                            className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            <div className="p-4 gap-4 mx-auto">
                                <div className="relative w-full">
                                    <label htmlFor="incentives" className="block mb-1 font-medium">
                                        Add Incentives
                                    </label>
                                    <textarea
                                        id="incentives"
                                        name="incentives"
                                        className="w-full h-32 p-2 border border-gray-300 rounded-lg focus:outline-none resize-none"
                                        placeholder="Add incentive"
                                        maxLength={MAX_CHAR_LIMIT}
                                        value={values.incentives}
                                        onChange={(e) => setFieldValue("incentives", e.target.value)}
                                    />
                                    <div className="absolute bottom-2 right-3 text-sm text-gray-500">
                                        {values.incentives.length} / {MAX_CHAR_LIMIT}
                                    </div>
                                </div>

                                <CustomDropdown
                                    label="Gender"
                                    options={genderOptions}
                                    selectedValue={selectedGender}
                                    onSelect={setSelectedGender}
                                    placeholder="Select Gender"
                                />

                                <div className="mt-4">
                                    <CustomDropdown
                                        label="Incentives Mood"
                                        options={incentivesMoodOptions}
                                        selectedValue={selectedMood}
                                        onSelect={setSelectedMood}
                                        placeholder="Select Mood"
                                    />
                                </div>

                                <div className="mt-4">
                                    <CustomDropdown
                                        label="Incentives Nature"
                                        options={incentivesNatureOptions}
                                        selectedValue={selectedNature}
                                        onSelect={setSelectedNature}
                                        placeholder="Select Nature"
                                    />
                                </div>

                                <div className="flex justify-end mt-4">
                                    <Button
                                        onClick={submitForm}
                                        className="w-[8%] flex items-center justify-center"
                                        size="sm"
                                        disabled={isSubmitting || loading}
                                    >
                                        {loading ? (
                                            <>
                                                <Spinner />
                                                saving...
                                            </>
                                        ) : (
                                            'Save'
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </ComponentCard>

                    {/* </div> */}
                </Form>
            )}
        </Formik>
    )
};

export default AddIncentiveForm;