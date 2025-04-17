import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // react-router-dom for browser apps
import { Formik, Form, Field, ErrorMessage } from "formik";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { loginAdmin } from "../../../services/admin/index"
// import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { SignInSchema } from "../../validations";
import { SignInValues } from "../../interface";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../ui/spinner/Spinner";
import { ToastContainer, toast } from 'react-toastify';

const initialValues: SignInValues = {
  email: "",
  password: "",
};


export default function SignInForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  // const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = async (
    values: SignInValues,
  ) => {
    setLoading(true);

    try {
      const response = await loginAdmin(values);
      console.log("🚀 ~ SignInForm ~ response:", response.data);
      if (response.status === 200) {
        toast("Login SuccessFully");
        setLoading(false);
        login(response.data);
        navigate("/")
      };

      // actions.setSubmitting(false);
    } catch (error) {
      console.log("🚀 ~ SignInForm ~ error:", error);
      alert("incorrect password")
      setLoading(false);
      throw error;
    }
  };

  return (
    <div className="flex flex-col flex-1">


      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Sign In
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter your email and password to sign in!
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={SignInSchema}
          onSubmit={handleSubmit}
        >
          {({ }) => (
            <Form className="space-y-6">
              {/* Email */}
              <div>
                <Label>Email <span className="text-error-500">*</span></Label>
                <Field name="email" as={Input} placeholder="info@gmail.com" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-sm text-red-500 pt-1"
                />
              </div>

              {/* Password */}

              <div>
                <Label>Password <span className="text-error-500">*</span></Label>
                <div className="relative">
                  <Field
                    name="password"
                    as={Input}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    )}
                  </span>
                </div>

                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-red-500 pt-1"
                />
              </div>

              {/* Keep Me Logged In */}
              <div className="flex items-center justify-between">
                {/* <div className="flex items-center gap-3">
                  <Checkbox checked={isChecked} onChange={setIsChecked} />
                  <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                    Keep me logged in
                  </span>
                </div> */}
                <Link
                  to="/reset-password"
                  className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <div>
                <Button className="w-full flex items-center justify-center gap-2" size="sm" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};