import React from 'react'
import { FaSearch } from 'react-icons/fa';

const Input = ({enterKeyPressed, handleSearch, handleUnitsClick}) => {
return (
    <div className="section section__inputs">
        <input
            onKeyDown={enterKeyPressed}
            type="text"
            name="city"
            placeholder="Enter City..."
        />
        <button onClick={handleSearch}>
            <FaSearch /> 
        </button>
        <button onClick={(e) => handleUnitsClick(e)}>°F</button>
    </div>
)
}

export default Input