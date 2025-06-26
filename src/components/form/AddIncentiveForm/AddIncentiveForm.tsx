import { Formik, Form, ErrorMessage } from 'formik';
import ComponentCard from '../../common/ComponentCard';
import Label from '../Label';
import Input from '../input/InputField';
import Button from '../../ui/button/Button';
import Spinner from '../../ui/spinner/Spinner';
import { useState } from 'react';
import { addIncentivesApi } from '../../../../services/incentives';
import { AddIncentivesPayload } from '../../../interface';
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


    const handleSubmit = async (values: AddIncentivesPayload) => {
        setLoading(true)
        try {
            const response = await addIncentivesApi(values);
            console.log("🚀 ~ handleSubmit ~ response:", response);
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



    return (
        <Formik
            initialValues={{
                incentives: "",
                gender: "",
                incentivesMood: "",
                incentivesNature: "",
            }}
            validationSchema={inceltivesValitionSchema}
            onSubmit={handleSubmit}
        >
            {({ handleSubmit, isSubmitting, values, setFieldValue, submitForm }) => (
                <Form onSubmit={handleSubmit}>
                    <ComponentCard className="w-[100%]" title="Incentives Form">


                        {/* <div className="max-w-md mx-auto flex   "> */}
                        {/* <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg"> */}
                        {/* <div className="space-y-6 flex space-x-4 item-center"> */}
                        {/* Name */}

                        {/* </div> */}
                        <div className="flex gap-4 items-center justify-between w`
                        flex-wrap w-full
                        md:flex-nowrap md:justify-start md:gap-6                        
                        ">
                            {/* Incentives Input */}
                            <div className='w-full'>
                                <Label htmlFor="name">Add incentives</Label>
                                {/* <Field name="name" >
                            {({ field }: any) => <Input type="text" id="name" {...field} />}
                        </Field> */}
                                <Input
                                    type="text" id="incentives"
                                    placeholder='Add incentive'
                                    value={values.incentives}
                                    onChange={(e) => setFieldValue('incentives', e.target.value)} />
                                {/* <ErrorMessage name="incentives">
                                    {(msg) => <p className="text-red-500 text-sm mt-1">{msg}</p>}
                                </ErrorMessage> */}
                            </div>
                            {/* Gender Dropdown */}
                            <CustomDropdown
                                label="Gender"
                                options={genderOptions}
                                selectedValue={selectedGender}
                                onSelect={setSelectedGender}
                                placeholder="Select Gender"
                            />

                            {/* Incentives Mood CustomDropdown */}
                            <CustomDropdown
                                label="Incentives Mood"
                                options={incentivesMoodOptions}
                                selectedValue={selectedMood}
                                onSelect={setSelectedMood}
                                placeholder="Select Mood"
                            />

                            {/* Incentives Nature CustomDropdown */}
                            <CustomDropdown
                                label="Incentives Nature"
                                options={incentivesNatureOptions}
                                selectedValue={selectedNature}
                                onSelect={setSelectedNature}
                                placeholder="Select Nature"
                            />
                        </div>

                        {/* Display Selected Values
                                    <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                                        <h3 className="font-semibold text-gray-700 mb-3">Selected Values:</h3>
                                        <div className="space-y-2 text-sm">
                                            <p><strong>Gender:</strong> {selectedGender || 'None selected'}</p>
                                            <p><strong>Mood:</strong> {selectedMood || 'None selected'}</p>
                                            <p><strong>Nature:</strong> {selectedNature || 'None selected'}</p>
                                        </div>
                                    </div> */}
                        {/* </div> */}
                        {/* </div> */}

                        {/* Submit Button */}
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
                    </ComponentCard>
                </Form>
            )}
        </Formik>
    )
};

export default AddIncentiveForm;