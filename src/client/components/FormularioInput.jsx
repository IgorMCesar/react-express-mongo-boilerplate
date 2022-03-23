import React from 'react';

export const FormularioInput = ({ label, tipo = 'text', id, placeholder, onChange }) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={tipo}
        className="form-control"
        name={id}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
