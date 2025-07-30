import React from 'react';
import {FaSearch} from 'react-icons/fa';

export default function SearchBar({value, onChange}) {
    return (
        <div className="relative w-full sm:w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
            <input
                type="text"
                size={100}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Buscar por marca o modelo"
                className="pl-10 pr-4 py-3 text-base border border-gray-300 rounded w-full"
            />
        </div>
    );
}
