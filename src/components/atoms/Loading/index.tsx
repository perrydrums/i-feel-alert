import React from 'react';
import './style.css';

export default function Loading({small = false}: {small?: boolean}) {
  return (
    <div className={small ? 'loading-small' : 'loading'}>
      <div className="loading__spinner--1"/>
      <div className="loading__spinner--2"/>
      <div className="loading__spinner--3"/>
    </div>
  )
}
