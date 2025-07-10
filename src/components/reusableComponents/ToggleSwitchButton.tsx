interface ToggleSwitchProps {
    value: boolean;
    onChange: (val: boolean) => void;
    label?: string; // optional label prop
  }
  
  const ToggleSwitchButton = ({ value, onChange, label }: ToggleSwitchProps) => {
    return (
      <div className="flex items-center gap-2">
        <div
          onClick={() => onChange(!value)}
          className={`w-12 h-6 flex items-center rounded-full cursor-pointer transition-colors duration-300 ${
            value ? "bg-[#EF6D22]" : "bg-gray-300"
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
              value ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </div>
        {label && <p className="text-md text-[#000000]">{label}</p>}
      </div>
    );
  };
  
  export default ToggleSwitchButton;
  