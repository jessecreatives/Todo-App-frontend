import React from 'react';

const FilterButton = ({name, pressed, setFilter}) => (
    <button type="button" className="btn toggle-btn" aria-pressed={pressed} onClick={() => setFilter(name)}>
        <span className="visually-hidden">Show </span>
        <span>{name}</span>
        <span className="visually-hidden"> tasks</span>
    </button>
);
export default FilterButton;