import React  from 'react';
import './style.css';

export default function Radio({ options,
                                name,
                                onChange,
                                addClassesOnSelected = {}
}: { options: string[], name: string, onChange: (value: string) => void, addClassesOnSelected?: { [key: string]: string } }) {
  const optionsMap = options.map((option, index) =>
    <div
      key={index}
      className={`${addClassesOnSelected[option] || ''}`}
    >
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
