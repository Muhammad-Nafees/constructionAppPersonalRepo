import { Formik, Form, FormikHelpers } from 'formik';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import Button from '../../ui/button/Button';
import Spinner from '../../ui/spinner/Spinner';
import CustomDropdown from '../../reusableComponents/CustomDropdown';
import { useAuth } from '../../../context/AuthContext';
import { SettingsValuesSchema } from '../../../interface';
import { settingValitionSchema } from '../../../validations';
import ToggleSwitchButton from '../../reusableComponents/ToggleSwitchButton';
import { genderOptions, roleOption } from '../../../data/index';
import CustomInput from '../../input/CustomInputField';
import { createSuperAdminApi, updateSuperAdminApi } from '../../../../services/admin';

interface AddUserFormProps {
    editingData?: SettingsValuesSchema | null;
    onEditSubmit?: (data: SettingsValuesSchema) => void;
    editLoading: boolean;
    setEditData: React.Dispatch<React.SetStateAction<SettingsValuesSchema | null>>;
    activeAccordion: string | null;
    setActiveAccordion: React.Dispatch<React.SetStateAction<string | null>>;
    toggleAccordion: (accordion: string) => void;
    formRef: React.RefObject<HTMLDivElement | null>;
};


const AddUserForm: React.FC<AddUserFormProps> = ({
    editingData = null,
    onEditSubmit,
    editLoading,
    setEditData,
    activeAccordion,
    setActiveAccordion,
    toggleAccordion,
    formRef,
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { user } = useAuth();

    const handleSubmit = async (
        values: SettingsValuesSchema,
        { resetForm }: FormikHelpers<SettingsValuesSchema>
    ) => {
        setLoading(true);
        try {
            if (editingData && onEditSubmit) {
                await onEditSubmit(values);
                setEditData(null);
                toast.success("Admin updated successfully");
            } else {
                // const apiCall = user?.role === "super-admin" ? createSuperAdminApi : updateSuperAdminApi;
                const response = await updateSuperAdminApi(values);
                console.log("🚀 ~ handleSubmit ~ response:", response.data)
                // const response = await apiCall(values);
                toast.success("Admin created successfully");
                // if (response.status === 201) {
                // } else {
                //     toast.error("Failed to create admin");
                // };

                resetForm();
            };
        } catch (err: unknown) {
            const axiosError = err as AxiosError<{ message: string }>;
            toast.error(axiosError.response?.data.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };



    return (
        <Formik
            enableReinitialize={true}
            initialValues={
                editingData
                    ? {
                        name: editingData?.name || '',
                        email: editingData?.email || '',
                        phoneNumber: editingData?.phoneNumber || '',
                        role: editingData?.role || '',
                        password: editingData ? '' : '',
                        confirmPassword: editingData ? '' : '',
                        userStatus: editingData?.userStatus ?? (user?.role === "super-admin"),
                        id: editingData._id,
                    }
                    : {
                        name: user?.name || '',
                        email: user?.email || '',
                        phoneNumber: user?.phoneNumber || '',
                        role: user?.role || '',
                        password: '',
                        confirmPassword: '',
                        userStatus: user?.role === "super-admin" || false,
                    }
            }
            validationSchema={settingValitionSchema}
            onSubmit={handleSubmit}
        >


            {({ values, touched, setFieldValue, submitForm, resetForm, isSubmitting, errors }) => (
                <Form>
                    <div className="w-full">
                        <div className="bg-[#400F09] py-3 sm:py-4 w-full flex flex-col sm:flex-row justify-between px-4 items-center gap-3">
                            <h1 className="text-lg sm:text-xl font-medium text-white">Settings Menu</h1>
                            <div className="flex flex-wrap gap-2 sm:gap-4 items-center">
                                <Button
                                    type="button"
                                    className="w-28 sm:w-32 text-white bg-[#B54D40] py-2 text-sm sm:text-base"
                                    onClick={() => {
                                        resetForm();
                                        if (editingData) setEditData(null);
                                        toggleAccordion('myprofile');
                                    }}
                                >
                                    My Profile
                                </Button>
                                <Button
                                    type="button"
                                    className="w-28 sm:w-44 text-white bg-gradient-to-r from-orange-400 to-red-600 py-2 text-sm sm:text-base"
                                    onClick={() => {
                                        resetForm();
                                        if (editingData) setEditData(null);
                                        toggleAccordion('addnewmanager');
                                    }}
                                >
                                    Add New Manager
                                </Button>
                            </div>
                        </div>

                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeAccordion === 'myprofile' ? 'max-h-[1000px] border border-dashed border-red-300' : 'max-h-0'}`}>
                            <div className="p-4 bg-[#FFF9F4]">
                                <div className="flex flex-col sm:flex-row w-full justify-between gap-4">
                                    <div className="w-full sm:w-1/2 flex flex-col gap-2">
                                        <CustomInput
                                            label="Full Name"
                                            name="name"
                                            value={values.name}
                                            onChange={(e) => setFieldValue('name', e.target.value)}
                                            placeholder="Enter Full Name"
                                            error={errors.name}
                                            touched={touched.name}
                                            errorClassName="h-6 text-sm"
                                        />
                                        <CustomInput
                                            label="Email"
                                            name="email"
                                            type="email"
                                            value={values.email}
                                            onChange={(e) => setFieldValue('email', e.target.value)}
                                            placeholder="Enter Email"
                                            error={errors.email}
                                            touched={touched.email}
                                            errorClassName="h-6 text-sm"
                                        />
                                        <CustomInput
                                            label="Phone Number"
                                            name="phoneNumber"
                                            type="tel"
                                            value={values.phoneNumber}
                                            onChange={(e) => setFieldValue('phoneNumber', e.target.value)}
                                            placeholder="Enter Phone Number"
                                            error={errors.phoneNumber}
                                            touched={touched.phoneNumber}
                                            errorClassName="h-6 text-sm"
                                        />
                                    </div>
                                    <div className="w-full sm:w-1/2 flex flex-col gap-2">
                                        <CustomDropdown
                                            label="Role"
                                            options={["super-admin"]}
                                            values={values.role}
                                            onSelect={(role) => setFieldValue('role', role)}
                                            className="w-full"
                                            placeholder="Select Roles"
                                            error={errors.role}
                                            touched={touched.role}
                                            name="role"
                                            errorClassName="h-6 text-sm"
                                        />
                                        <CustomInput
                                            label="Password"
                                            name="password"
                                            type="password"
                                            value={values.password}
                                            onChange={(e) => setFieldValue('password', e.target.value)}
                                            placeholder="********"
                                            error={errors.password}
                                            touched={touched.password}
                                            errorClassName="h-6 text-sm"
                                        />
                                        <CustomInput
                                            label="Confirm Password"
                                            name="confirmPassword"
                                            type="password"
                                            value={values.confirmPassword}
                                            onChange={(e) => setFieldValue('confirmPassword', e.target.value)}
                                            placeholder="********"
                                            error={errors.confirmPassword}
                                            touched={touched.confirmPassword}
                                            errorClassName="h-6 text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-end space-x-0 sm:space-x-6 px-4 items-center pb-8 mt-4">
                                    <div className="flex gap-2 mt-4 sm:mt-0">
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                resetForm();
                                                if (editingData) setEditData(null);
                                                toggleAccordion('myprofile');
                                                setTimeout(() => {
                                                    formRef.current?.scrollIntoView({ behavior: 'smooth' });
                                                }, 100);
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
                                            disabled={isSubmitting || loading || editLoading}
                                        >
                                            {(loading || editLoading) ? (
                                                <>
                                                    <Spinner />
                                                    <span>{editingData ? 'Updating...' : 'Saving...'}</span>
                                                </>
                                            ) : (
                                                <span>{editingData ? 'Update' : 'Save'}</span>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeAccordion === 'addnewmanager' ? 'max-h-[1000px] border border-dashed border-red-300' : 'max-h-0'}`}>
                            <div className="p-4 bg-[#FFF9F4]">
                                <div className="flex flex-col sm:flex-row w-full justify-between gap-4">
                                    <div className="w-full sm:w-1/2 flex flex-col gap-2 sm:gap-3">
                                        <CustomInput
                                            label="Full Name"
                                            name="name"
                                            value={values.name}
                                            onChange={(e) => setFieldValue('name', e.target.value)}
                                            placeholder="Enter Full Name"
                                            error={errors.name}
                                            touched={touched.name}
                                            errorClassName="h-6 text-sm"
                                        />
                                        <CustomInput
                                            label="Email"
                                            name="email"
                                            type="email"
                                            value={values.email}
                                            onChange={(e) => setFieldValue('email', e.target.value)}
                                            placeholder="Enter Email"
                                            error={errors.email}
                                            touched={touched.email}
                                            errorClassName="h-6 text-sm"
                                        />
                                        <CustomInput
                                            label="Phone Number"
                                            name="phoneNumber"
                                            type="tel"
                                            value={values.phoneNumber}
                                            onChange={(e) => setFieldValue('phoneNumber', e.target.value)}
                                            placeholder="Enter Phone Number"
                                            error={errors.phoneNumber}
                                            touched={touched.phoneNumber}
                                            errorClassName="h-6 text-sm"
                                        />
                                    </div>
                                    <div className="w-full sm:w-1/2 flex flex-col gap-2 sm:gap-3">
                                        <CustomDropdown
                                            label="Role"
                                            options={["admin"]}
                                            values={values.role}
                                            onSelect={(role) => setFieldValue('role', role)}
                                            className="w-full"
                                            placeholder="Select Role"
                                            error={errors.role}
                                            touched={touched.role}
                                            name="role"
                                            errorClassName="h-6 text-sm"
                                        />
                                        <CustomInput
                                            label="Password"
                                            name="password"
                                            type="password"
                                            value={values.password}
                                            onChange={(e) => setFieldValue('password', e.target.value)}
                                            placeholder="********"
                                            error={errors.password}
                                            touched={touched.password}
                                            errorClassName="h-6 text-sm"
                                        />
                                        <CustomInput
                                            label="Confirm Password"
                                            name="confirmPassword"
                                            type="password"
                                            value={values.confirmPassword}
                                            onChange={(e) => setFieldValue('confirmPassword', e.target.value)}
                                            placeholder="********"
                                            error={errors.confirmPassword}
                                            touched={touched.confirmPassword}
                                            errorClassName="h-6 text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-between space-x-0 sm:space-x-6 px-4 items-center pb-8 mt-4">
                                    <ToggleSwitchButton
                                        value={values.userStatus}
                                        onChange={(val) => setFieldValue('userStatus', val)}
                                        label={values.userStatus ? 'Active' : 'Inactive'}
                                        className="w-10 h-5 flex items-center rounded-full cursor-pointer transition-colors duration-300 "
                                        classNameKnob="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 "
                                    // disabled={!user?.role || user.role !== "super-admin"}
                                    />
                                    <div className="flex gap-2 mt-4 sm:mt-0">
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                resetForm();
                                                if (editingData) setEditData(null);
                                                toggleAccordion('addnewmanager');
                                                setTimeout(() => {
                                                    formRef.current?.scrollIntoView({ behavior: 'smooth' });
                                                }, 100);
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
                                            disabled={isSubmitting || loading || editLoading || (!user?.role || user.role !== "super-admin")}
                                        >
                                            {(loading || editLoading) ? (
                                                <>
                                                    <Spinner />
                                                    <span>{editingData ? 'Updating...' : 'Saving...'}</span>
                                                </>
                                            ) : (
                                                <span>{editingData ? 'Update' : 'Save'}</span>
                                            )}
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

export default AddUserForm;