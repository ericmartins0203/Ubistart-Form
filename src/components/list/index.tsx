import { useContext } from "react";
import { DataContext } from "../../provider/DataContext";

export default function List() {

  const { submittedData, setSubmittedData } = useContext(DataContext)

  const handleEdit = (data: any) => {
    
  };

  return(
    <>
    <div className="mt-8">
        {submittedData.length > 0 && (
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Id</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">CEP</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submittedData.map((data) => (
                <tr key={data.id}>
                  <td className="border border-gray-300 px-4 py-2">{data.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{data.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{data.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{data.cep}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleEdit(data)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}