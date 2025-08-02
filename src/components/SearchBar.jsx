import { FaSearch } from 'react-icons/fa';

export default function SearchBar({ value, onChange }) {
    return (
        <div className="search-container">
            <FaSearch className="search-icon" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Buscar por marca o modelo"
                className="search-input"
            />
        </div>
    );
}
