// components/PettyCash/AllocatedSummary.tsx
const AllocatedSummary = () => {
  const data = [
    { site: "BWD5", allocated: 500000, remaining: 150000, percentage: 70 },
    { site: "Lakhani", allocated: 300000, remaining: 20000, percentage: 93 },
    { site: "IT Park", allocated: 800000, remaining: 350000, percentage: 56 },
  ];

  return (
    <div className="space-y-4">
      {data.map(item => (
        <div key={item.site} className="space-y-2">
          <div className="flex justify-between">
            <span>{item.site}</span>
            <span className="text-sm">
              <span className="text-red-600">Rs. {item.allocated.toLocaleString()}</span>
              {" / "}
              <span className="text-green-600">Rs. {item.remaining.toLocaleString()}</span>
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#F47521] h-2 rounded-full transition-all" 
              style={{ width: `${item.percentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllocatedSummary;