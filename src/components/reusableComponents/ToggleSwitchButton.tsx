interface ToggleSwitchProps {
  value: boolean;
  onChange: (val: boolean) => void;
  label?: string; // optional label prop
  className: string;
  classNameKnob: string
}

const ToggleSwitchButton = ({ value, onChange, label, className, classNameKnob }: ToggleSwitchProps) => {
  return (
    <div className="flex items-center gap-2">
      <div
        onClick={() => onChange(!value)}
        className={`${className}${value ? "bg-[#EF6D22]" : "bg-gray-300"
          }`}
      >
        <div
          className={`${classNameKnob}${value ? "translate-x-5.5" : "translate-x-1"
            }`}
        />
      </div>
      {label && <p className="text-md text-[#000000]">{label}</p>}
    </div>
  );
};

export default ToggleSwitchButton;
