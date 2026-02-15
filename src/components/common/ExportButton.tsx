// components/common/ExportButton.tsx
interface Props {
  onExport: (format: 'excel' | 'pdf') => void;
}

const ExportButton = ({ onExport }: Props) => {
  return (
    <div className="flex gap-2">
      <button 
        onClick={() => onExport('excel')}
        className="px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 flex items-center gap-1"
      >
        📥 Excel
      </button>
      <button 
        onClick={() => onExport('pdf')}
        className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 flex items-center gap-1"
      >
        📄 PDF
      </button>
    </div>
  );
};

export default ExportButton;