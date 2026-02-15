// components/common/DateFilter.tsx
interface Props {
  fromDate: string;
  toDate: string;
  onFromChange: (date: string) => void;
  onToChange: (date: string) => void;
  onApply: () => void;
}

const DateFilter = ({ fromDate, toDate, onFromChange, onToChange, onApply }: Props) => {
  return (
    <div className="flex gap-4 items-center">
      <input 
        type="date" 
        className="px-3 py-2 border rounded-lg text-sm"
        value={fromDate}
        onChange={(e) => onFromChange(e.target.value)}
        placeholder="From"
      />
      <span>to</span>
      <input 
        type="date" 
        className="px-3 py-2 border rounded-lg text-sm"
        value={toDate}
        onChange={(e) => onToChange(e.target.value)}
        placeholder="To"
      />
      <button 
        onClick={onApply}
        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
      >
        Apply Filter
      </button>
    </div>
  );
};

export default DateFilter;