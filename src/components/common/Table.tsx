// components/common/Table.tsx
interface Props {
  columns: string[];
  data: any[];
  renderRow: (item: any) => React.ReactNode;
}

const Table = ({ columns, data, renderRow }: Props) => {
  return (
    <div className="bg-white rounded-xl border overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {columns.map(col => (
              <th key={col} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map(renderRow)}
        </tbody>
      </table>
    </div>
  );
};

export default Table;