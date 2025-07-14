import { useState, useRef, useEffect } from "react";

type FilterDropdownProps = {
    label?: string;
    options: string[];
    values: string[]|string;
    onSelect: (option: string) => void;
    placeholder?: string;
    className?: string;
    name: string;
    buttonClassName: string
};

const FilterDropdown = ({
    label,
    options,
    values,
    onSelect,
    placeholder = "Select an option",
    className = "",
    buttonClassName
}: FilterDropdownProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleToggle = () => setIsOpen((prev) => !prev);
    const handleSelect = (option: string) => {
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            {label && <label className="block mb-2 text-md font-medium text-[#000000]">{label}</label>}

            <button
                type="button"
                onClick={handleToggle}
                className={`${buttonClassName} px-3 py-2 justify-between text-left border-[#AFA69B] bg-[#FFF6EB] border-2`}
            >
                <div className="flex justify-between items-center gap-4">
                    <span
                        className={`${values ? "text-gray-900" : "text-gray-500"
                            } truncate block w-full overflow-hidden whitespace-nowrap text-ellipsis`}
                    >
                        {values || placeholder}
                    </span>

                    <svg
                        className={`w-5 h-5  transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                            }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>


            {isOpen && (
                <div className="absolute w-full z-50 mt-1 bg-white border border-gray-300 max-h-60 overflow-auto shadow-md rounded">
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

export default FilterDropdown;
