import React from "react";


function UserTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Name
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              email
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              age
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr>
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              John Doe
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              24/05/1995
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              Web Developer
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              $120,000
            </td>
            <td className="whitespace-nowrap px-4 py-2">
              <button className="inline-block rounded bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-600 mx-2">
                edit
              </button>
              <button className="inline-block rounded bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-600 mx-2">
                delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default UserTable;
