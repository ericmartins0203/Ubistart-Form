import { IFormatData } from "../interface";

interface IProps {
  submittedData: IFormatData[];
  formData: IFormatData; 
  setErrors: (data: Partial<IFormatData>) => void
}

export const validate = ({submittedData, formData, setErrors}: IProps) => {

  const newErrors: Partial<IFormatData> = {};

  if (!formData.name.trim()) {
    newErrors.name = "Name is required.";
  } else if (/\d/.test(formData.name)) {
    newErrors.name = "Name cannot contain numbers.";
  }

  if (!formData.email.trim()) {
    newErrors.email = "Email is required.";
  } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
    newErrors.email = "Invalid email format.";
  } else if (submittedData.some((data: IFormatData) => data.email === formData.email)) {
    newErrors.email = "Email is already registered.";
  }

  if (!formData.cep.trim()) {
    newErrors.cep = "CEP is required.";
  } else if (!/^\d{5}-?\d{3}$/.test(formData.cep)) {
    newErrors.cep = "Invalid CEP format.";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};