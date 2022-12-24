import React from 'react';
import './style.css';

export default function StateFilter({onClick}: {onClick: (state: string) => any}) {
  const [selected, setSelected] = React.useState('all');

  const buttons = ['all', 'red', 'yellow', 'green'].map((state) => {
    const className = `state-filter-button ${state === 'all' 
      ? 'state-filter-button--all' 
      : `state-filter-button--${state}`}
    `;

    return (
      <button key={state}
              className={`${className} ${selected === state ? 'state-filter--selected' : ''}`}
              onClick={() => {
                setSelected(state);
                onClick(state);
              }}
      />
    )
  });
  return (
    <div className="state-filter">
      {buttons}
    </div>
  );
}
