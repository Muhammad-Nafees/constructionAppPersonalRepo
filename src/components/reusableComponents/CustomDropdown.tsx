import React, { useState, useRef, useEffect } from 'react';
// import { ChevronDown } from 'lucide-react';

// Reusable Dropdown Component
const CustomDropdown = ({
    label,
    options,
    selectedValue,
    onSelect,
    placeholder = "Select an option",
    className = ""
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);



    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option: any) => {
        onSelect(option);
        setIsOpen(false);
    };


    
    return (
        <div className={`relative  w-full ${className}`} ref={dropdownRef}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}

            <button
                type="button"
                onClick={handleToggle}
                className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            >
                <div className="flex justify-between items-center">
                    <span className={selectedValue ? "text-gray-900" : "text-gray-500"}>
                        {selectedValue || placeholder}
                    </span>
                    {/* <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''
                            }`}
                    /> */}
                </div>
            </button>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {options.map((option: any, index: any) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => handleSelect(option)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
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