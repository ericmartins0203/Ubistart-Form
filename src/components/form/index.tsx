import React, { useState, useContext, useEffect } from "react";
import { IFormatData } from "../../interface";
import { DataContext } from "../../provider/DataContext";
import { validate } from "./validate";

import styles from "./form.module.css";
import Input from "../input";


export default function FormWithFeedback() {
  const [formData, setFormData] = useState<IFormatData>({
    name: "",
    email: "",
    cep: "",
  });
  const [errors, setErrors] = useState<Partial<IFormatData & { request?: string }>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { 
    submittedData, 
    setSubmittedData, 
    isEditting, 
    setIsEditting,
    saveData
  } = useContext(DataContext)

  const handleSubmit = async (event: React.FormEvent) => {
    
    setErrors({ 
      name: "",
      email: "",
      cep: ""
    });
    
    event.preventDefault();

    if (!validate({ submittedData, isEditting, formData, setErrors })) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${formData.cep.replace("-", "")}`);

      if (response.ok) {
        if (isEditting) {
          const updatedData  = submittedData.map((data) => (
            data.id === formData.id ? { ...isEditting, ...formData } : data
          ));
          setSubmittedData(updatedData);
          saveData(updatedData);
          setIsEditting(null);
        } else {
          const newEntry = { ...formData, id: submittedData.length + 1 };
          const newData = [...submittedData, newEntry]
          setSubmittedData(newData);
          saveData(newData)
        }

        setFormData({ name: "", email: "", cep: "" });
      } else {
        setErrors({ ...errors, cep: "Invalid CEP." });
      }
    } catch (error) {
      setErrors({ ...errors, request: "Erro na api, tente novamente." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (!name) {
      console.error("Error: Missing name property.");
      return;
    }

    let newValue = value;

    if (value === "") {
      setFormData({ ...formData, [name]: "" });
      return;
    }

    if ( name === "cep") {
      newValue = value.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2")
    } else if (name === "name") {
      newValue = value.replace(/\d/g, "");
    } else {
      newValue = value
    }
    
    setFormData({ ...formData, [name]: newValue });
  };

  useEffect(() => {
    if (isEditting) {
      setFormData(isEditting);
    } else {
      setFormData({ name: "", email: "", cep: ""});
    }
  }, [isEditting]);

  return (
    <div className={styles.formContainer}>
      { isEditting ? <h2>Edite seu endereço</h2> : <h2>Cadastre seu endereço</h2>}
      <form onSubmit={handleSubmit}>
        <Input 
          name="name"
          label="Nome" 
          value={formData.name} 
          handleChange={handleChange} 
          errors={errors} 
        />

        <Input 
          name="email"
          label="Email" 
          value={formData.email} 
          handleChange={handleChange} 
          errors={errors} 
        />

        <Input 
          name="cep"
          label="CEP" 
          maxLength={9}
          pattern="\d{5}-?\d{3}"
          value={formData.cep} 
          handleChange={handleChange} 
          errors={errors} 
        />
        
        <p className={styles.error}>{errors.request}</p>
        <button
          type="submit"
          disabled={isSubmitting}
          className={` ${ isSubmitting ? "sending" : "" }`}
        >
          {isSubmitting ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}
