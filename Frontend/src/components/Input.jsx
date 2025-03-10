import React from 'react';

const Input = ({ label, type = "text", value, onChange, name, ...props }) => {
  const handleInputChange = (e) => {
    let newValue = e.target.value;

    // Validaciones específicas por tipo
    if (type === 'number') {
      // Permite solo números y limita a 10 dígitos para documentos
      newValue = newValue.replace(/\D/g, '').slice(0, 10);
    } else if (type === 'tel') {
      // Validación para números telefónicos
      newValue = newValue.replace(/\D/g, '').slice(0, 10);
    }

    // Propagamos el evento personalizado
    if (onChange) {
      onChange({
        target: {
          name: name,
          value: newValue
        }
      });
    }
  };

  return (
    <div className="input-container">
      <label>{label}</label>
      <input
        type={type}
        className="input-field"
        value={value}
        onChange={handleInputChange}
        name={name}
        {...props}
      />
    </div>
  );
};

export default Input;