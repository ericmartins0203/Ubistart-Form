import React, { createContext, useState } from "react";
import { IFormatData } from "../interface";

interface IDataContext {
  submittedData: IFormatData[];
  setSubmittedData: (data: IFormatData[]) => void;
  isEditting: IFormatData | null;
  setIsEditting: (data: IFormatData | null) => void
  saveData: (data: IFormatData[]) => void
}

interface IDataProvider {
  children: React.ReactNode
}

export const DataContext = createContext<IDataContext>({} as IDataContext);

export const DataProvider = ({children}: IDataProvider) => {

  const [submittedData, setSubmittedData] = useState<IFormatData[]>(() => {
    return localStorage.getItem('submittedData') ? JSON.parse(localStorage.getItem('submittedData') || '[]') : [];
  });

  const [ isEditting, setIsEditting ] = useState<IFormatData | null>(null);

  const saveData = (data: IFormatData[]) => {
    localStorage.setItem('submittedData', JSON.stringify(data));
  }

  return (
    <DataContext.Provider 
      value={{
        submittedData, 
        setSubmittedData,
        isEditting,
        setIsEditting,
        saveData
      }}
    >
      {children}
    </DataContext.Provider>
  )
}