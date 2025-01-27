import React, { useState, useContext } from "react";
import { IFormatData } from "../../interface";
import { DataContext } from "../../provider/DataContext";
import { validate } from "../../utils/validate.utils";

interface IHandleChangeEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & EventTarget;
}

export default function FormWithFeedback() {
  const [formData, setFormData] = useState<IFormatData>({
    name: "",
    email: "",
    cep: "",
  });
  const [errors, setErrors] = useState<Partial<IFormatData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { submittedData, setSubmittedData } = useContext(DataContext)

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    if (!validate({ submittedData, formData, setErrors })) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${formData.cep.replace("-", "")}`);

      if (response.ok) {
        const newEntry = { ...formData, id: submittedData.length + 1 };

        setSubmittedData([...submittedData, newEntry]);

        setFormData({ name: "", email: "", cep: "" });
      } else {
        setErrors({ ...errors, cep: "Invalid CEP." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: IHandleChangeEvent) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "cep") {
      newValue = value.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2");
    }

    if (name === "name") {
      newValue = value.replace(/\d/g, "");
    }

    setFormData({ ...formData, [name]: newValue });
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">CEP</label>
          <input
            type="text"
            name="cep"
            value={formData.cep}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.cep && <p className="text-red-500 text-sm">{errors.cep}</p>}
        </div>

        <button
          onClick={(e) => handleSubmit(e)}
          disabled={isSubmitting}
          className={`w-full px-4 py-2 text-white rounded ${
            isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
