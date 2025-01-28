import { IFormatData } from "../../interface";

interface IProps {
  submittedData: IFormatData[];
  isEditting: IFormatData | null;
  formData: IFormatData;
  setErrors: (data: Partial<IFormatData>) => void;
}

export const validate = ({ submittedData, isEditting, formData, setErrors }: IProps) => {
  const newErrors: Partial<IFormatData> = {};

  if (!formData.name.trim()) {
    newErrors.name = "Nome é obrigatório.";
  } else if (/\d/.test(formData.name)) {
    newErrors.name = "Nome não pode conter números.";
  }

  if (!formData.email.trim()) {
    newErrors.email = "Email é obrigatório.";
  } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
    newErrors.email = "Formato inválido de email.";
  } else {
    const isDuplicateEmail = submittedData.some(
      (data: IFormatData) =>
        data.email === formData.email && (!isEditting || data.id !== isEditting.id)
    );

    if (isDuplicateEmail) {
      newErrors.email = "Email já cadastrado.";
    }
  }

  if (!formData.cep.trim()) {
    newErrors.cep = "CEP é obrigatório.";
  } else if (!/^\d{5}-?\d{3}$/.test(formData.cep)) {
    newErrors.cep = "Formato inválido de CEP.";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};