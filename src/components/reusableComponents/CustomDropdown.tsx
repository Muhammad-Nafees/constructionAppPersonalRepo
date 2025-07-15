import { ErrorMessage } from 'formik';
import { useState, useRef, useEffect } from 'react';

type CustomDropdownProps = {
    label?: string;
    options: string[];
    values: string;
    onSelect: (option: string) => void;
    placeholder?: string;
    className?: string;
    error?: string | undefined;
    touched?: boolean | undefined;
    name: string;
    errorClassName?: string;
};

// Reusable Dropdown Component
const CustomDropdown = ({
    label,
    options,
    values,
    onSelect,
    placeholder = "Select an option",
    className = "",
    error,
    touched,
    name,
    errorClassName
}: CustomDropdownProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option: string) => {
        onSelect(option);
        setIsOpen(false);
    };



    return (
        <div className={`${className}`} ref={dropdownRef}>

            {label && (
                <label className="block text-md font-medium text-[#000000] mb-2">
                    {label}
                </label>
            )}

            <div className="p-[2px] bg-gradient-to-r from-orange-600 to-orange-400">
                <button
                    type="button"
                    onClick={handleToggle}
                    className="w-full px-4 py-2 text-left bg-white"
                >
                    <div className="flex justify-between items-center">
                        <span className={values ? "text-gray-900" : "text-gray-500"}>
                            {values || placeholder}
                        </span>

                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#EB6622]">
                            <svg
                                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                                    }`}
                                fill="none"
                                stroke="#FFF"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                    </div>
                </button>
            </div>

            {
                error && touched ?
                    <ErrorMessage
                        name={name}
                        component="div"
                        className="text-sm text-red-500 pt-1"
                    />
                    :
                    <div className={errorClassName} />
            }
            {isOpen && (
                <div className="absolute w-[34%] z-50 mt-1 bg-white border border-gray-300 max-h-60 overflow-auto shadow-md rounded">
                    {options.map((option, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => handleSelect(option)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                        >
                            <span className="text-gray-900">{option}</span>
                        </button>
                    ))}
                </div>
            )}


        </div>
    );
};

export default CustomDropdown;

{/* {
                error && touched ?
                    <ErrorMessage
                        name={name}
                        component="div"
                        className="text-sm text-red-500 pt-1"
                    />
                    :
                    <div className={errorClassName} />
            } */}