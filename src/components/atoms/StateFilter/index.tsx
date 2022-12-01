import React from 'react';
import './style.css';

export default function StateFilter({onClick}: {onClick: (state: string) => any}) {
  return (
    <div className="state-filter">
      <button className="state-filter-button state-filter-button--rainbow" onClick={() => onClick('all')} />
      <button className="state-filter-button bg--red" onClick={() => onClick('red')} />
      <button className="state-filter-button bg--yellow" onClick={() => onClick('yellow')} />
      <button className="state-filter-button bg--green" onClick={() => onClick('green')} />
    </div>
  );
}
