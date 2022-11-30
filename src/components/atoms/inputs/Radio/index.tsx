import React  from 'react';
import './style.css';

export default function Radio({ options, name, onChange }: { options: string[], name: string, onChange: (value: string) => void }) {
  const optionsMap = options.map((option, index) =>
    <div key={index}>
      <input type="radio"
             name={name}
             id={`${name}-${option}`}
             value={option}
             onChange={(e) => onChange(e.target.value)}
      />
      <label htmlFor={`${name}-${option}`}>{option}</label>
    </div>
  );

  return (
    <div className="input--radio-container">
      {optionsMap}
    </div>
  )
}
