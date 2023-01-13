import React from 'react';
import './style.css';

export default function Loading({small = false, text}: {small?: boolean, text?: string}) {
  return (
    <div className={small ? 'loading-small' : 'loading'}>
      {text && <h1>{text}</h1>}
      <div className="loading__spinner--1"/>
      <div className="loading__spinner--2"/>
      <div className="loading__spinner--3"/>
    </div>
  )
}
