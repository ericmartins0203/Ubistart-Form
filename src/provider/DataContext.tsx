import React, { createContext, useState } from "react";
import { IFormatData } from "../interface";

interface IDataContext {
  submittedData: IFormatData[];
  setSubmittedData: (data: IFormatData[]) => void;
}

interface IDataProvider {
  children: React.ReactNode
}

export const DataContext = createContext<IDataContext>({} as IDataContext);

export const DataProvider = ({children}: IDataProvider) => {

  const [submittedData, setSubmittedData] = useState<IFormatData[]>([]);

  return (
    <DataContext.Provider 
      value={{
        submittedData, 
        setSubmittedData
      }}
    >
      {children}
    </DataContext.Provider>
  )
}