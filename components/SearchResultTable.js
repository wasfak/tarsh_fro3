import React from "react";

export default function SearchResultTable({ searchResult }) {
  if (!searchResult || !searchResult.result) {
    return null;
  }

  const branchData = searchResult.result;

  return (
    <div className="">
      <table className="min-h-full w-full bg-white border border-gray-300 shadow-md rounded-md">
        <thead className="bg-blue-500 text-white">
          <tr>
            {Object.keys(branchData).map((branchName) => (
              <th key={branchName} className="px-2 text-left font-semibold">
                {branchName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          <tr>
            {Object.keys(branchData).map((branchName) => (
              <td
                key={branchName}
                className="py-3 px-6 whitespace-nowrap border-b text-sm"
              >
                {branchData[branchName]}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
