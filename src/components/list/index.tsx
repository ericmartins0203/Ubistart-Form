import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../provider/DataContext";
import styles from './list.module.css'
import { IFormatData } from "../../interface";

interface IProps {
  setIsOpen: (isOpen: boolean) => void
  filter: string
}

export default function List({setIsOpen, filter}: IProps) {

  const [ selectedData, setSelectedData ] = useState<IFormatData[]>([]);

  const { submittedData, setSubmittedData, setIsEditting } = useContext(DataContext)

  const handleEdit = (data: IFormatData) => {
    setIsOpen(true);
    setIsEditting(data);
  };

  const handleDelete = (id: number) => {
    const updatedData = submittedData.filter((data) => data.id !== id);
    setSubmittedData(updatedData);
  };

  useEffect(() => {
    if (filter) {
      const filteredData = submittedData.filter((data) =>
        Object.values(data).some((value) =>
          value.toString().toLowerCase().includes(filter.toLowerCase())
        )
      );
      setSelectedData(filteredData);
    } else {
      setSelectedData(submittedData)
    }
  }, [filter, submittedData]);

  return(
    <>
      <div className={styles.listContainer}>
        {submittedData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Email</th>
                <th>CEP</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              { selectedData.map((data: IFormatData) => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.cep}</td>
                  <td className={styles.actions}>
                    <button
                      onClick={() => handleEdit(data)}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(data.id as number)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody> 
          </table>
        ):
        <p>Nenhum dado cadastrado.</p>}
      </div>
    </>
  )
}