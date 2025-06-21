const Input = ({ label, name, type, value, onChange, error, ...props }) => {
  const handleInputChange = (e) => {
    let newValue = e.target.value;

    // Validaciones específicas por tipo
    if (type === 'number' || type === 'tel') {
      // Permite solo números y limita a 10 dígitos para documentos o teléfonos
      newValue = newValue.replace(/\D/g, '').slice(0, 10);
    }

    // Propagamos el evento personalizado
    if (onChange) {
      onChange({
        target: {
          name: name,
          value: newValue,
        },
      });
    }
  };

  // Asegúrate de que el valor no sea null
  const safeValue = value === null ? '' : value;

  return (
    <div className="input-container">
      <label>{label}</label>
      <input
        type={type}
        className={`input-field ${error ? 'input-error' : ''}`}
        value={safeValue}
        onChange={handleInputChange}
        name={name}
        {...props}
      />
       {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default Input;