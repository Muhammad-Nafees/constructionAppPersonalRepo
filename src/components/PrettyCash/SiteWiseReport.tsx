// components/PettyCash/SiteWiseReport.tsx
const SiteWiseReport = () => {
  const data = [
    { site: "BWD5", allocated: 500000, spent: 350000, remaining: 150000 },
    { site: "Lakhani", allocated: 300000, spent: 280000, remaining: 20000 },
    { site: "IT Park", allocated: 800000, spent: 450000, remaining: 350000 },
  ];

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-50">
          <th className="px-4 py-2 text-left">Site</th>
          <th className="px-4 py-2 text-right">Allocated</th>
          <th className="px-4 py-2 text-right">Spent</th>
          <th className="px-4 py-2 text-right">Remaining</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.site}>
            <td className="px-4 py-2">{item.site}</td>
            <td className="px-4 py-2 text-right text-blue-600">Rs. {item.allocated.toLocaleString()}</td>
            <td className="px-4 py-2 text-right text-red-600">Rs. {item.spent.toLocaleString()}</td>
            <td className="px-4 py-2 text-right text-green-600">Rs. {item.remaining.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SiteWiseReport;