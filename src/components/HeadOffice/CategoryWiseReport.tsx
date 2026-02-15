// components/HeadOffice/CategoryWiseReport.tsx
interface Props {
  expenses: any[];
  categories: string[];
  onClose: () => void;
}

const CategoryWiseReport = ({ expenses, categories, onClose }: Props) => {
  const categoryTotals = categories.map(cat => ({
    category: cat,
    total: expenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0)
  })).filter(c => c.total > 0);

  const grandTotal = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
       <div
        className="fixed inset-0 bg-black/40 backdrop-blur-md"
      />
      <div className="absolute inset-0  bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-xl max-w-lg w-full p-6">
        <h3 className="text-xl font-bold mb-4">Category-wise Report</h3>
        <div className="space-y-3">
          {categoryTotals.map(cat => (
            <div key={cat.category} className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">{cat.category}</span>
              <span className="text-[#F47521] font-bold">Rs. {cat.total.toLocaleString()}</span>
            </div>
          ))}
          <div className="flex justify-between p-3 bg-orange-50 rounded-lg mt-4">
            <span className="font-bold">Total</span>
            <span className="font-bold text-[#F47521]">Rs. {grandTotal.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 rounded-lg">Close</button>
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseReport;