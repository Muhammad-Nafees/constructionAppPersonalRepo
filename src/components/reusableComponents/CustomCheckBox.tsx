import React from "react";
import { BsSquare, BsCheckSquare } from "react-icons/bs";
import styled from "styled-components";

interface CustomCheckboxProps {
    className?: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
    className,
    checked,
    onChange,
}) => {
    return (
        <label className={`relative cursor-pointer ${className}`}>
            <HiddenCheckbox
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
            {checked ? (
                <BsCheckSquare fill="#F47521" size={18} />
            ) : (
                <BsSquare fill="#F47521" size={18} />
            )}
        </label>
    );
};

export default CustomCheckbox;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;
