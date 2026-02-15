// components/HeadOffice/MonthlySummary.tsx
interface Props {
  expenses: any[];
  categories: string[];
  onClose: () => void;
}

const MonthlySummary = ({ expenses, categories, onClose }: Props) => {
  const currentMonth = new Date().toISOString().substring(0, 7);
  const monthlyExpenses = expenses.filter(e => e.date.startsWith(currentMonth));
  
  const categoryTotals = categories.map(cat => ({
    category: cat,
    total: monthlyExpenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0)
  })).filter(c => c.total > 0);

  const total = monthlyExpenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-md" 
       />
      <div className="absolute inset-0 bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-xl max-w-lg w-full p-6">
        <h3 className="text-xl font-bold mb-4">Monthly Summary - {currentMonth}</h3>
        <div className="space-y-4">
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Expenses</p>
            <p className="text-3xl font-bold text-[#F47521]">Rs. {total.toLocaleString()}</p>
          </div>
          <div className="space-y-2">
            {categoryTotals.map(cat => (
              <div key={cat.category} className="flex justify-between p-2 border-b">
                <span>{cat.category}</span>
                <span className="font-medium">Rs. {cat.total.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 rounded-lg">Close</button>
        </div>
      </div>
    </div>
  );
};

export default MonthlySummary;