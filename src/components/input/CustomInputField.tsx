import { ErrorMessage } from 'formik';

type CustomInputProps = {
    label?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
    error?: string | undefined;
    touched?: boolean | undefined;
    name: string;
    errorClassName?: string;
    type?: string;
};

const CustomInput = ({
    label,
    value,
    onChange,
    placeholder = "Enter something...",
    className = "",
    error,
    touched,
    name,
    errorClassName = "h-4",
    type
}: CustomInputProps) => {
    // const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={`relative w-full ${className}`}>
            {label && (
                <label className="block text-md font-medium text-[#000000] mb-2">
                    {label}
                </label>
            )}

            <div className="p-[2px] bg-gradient-to-r from-orange-600 to-orange-400 w-full">
                <input
                    type={type || "text"}
                    name={name}
                    value={value}
                    onChange={onChange}
                    // onFocus={() => setIsFocused(true)}
                    // onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    className="w-full px-4 py-2 text-gray-900 bg-white focus:outline-none"
                />
            </div>

            {error && touched ? (
                <ErrorMessage
                    name={name}
                    component="div"
                    className="text-sm text-red-500 pt-1"
                />
            ) : (
                <div className={errorClassName} />
            )}
        </div>
    );
};

export default CustomInput;
