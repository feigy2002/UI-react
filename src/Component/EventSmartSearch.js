import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const EventSmartSearch = ({ seteventsList }) => {
    const [smartSearch, setSmartSearch] = useState();

    const handleSmartSearch = async () => {
        try {
            const response = await fetch(`https://localhost:7122/api/Event/smartSearch?searchTxt=${smartSearch}`);
            const jsonData = await response.json();
            seteventsList(jsonData || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className='row smart-search-box'>
            <input
                type='text'
                value={smartSearch}
                onChange={(e) => setSmartSearch(e.target.value)}
                onKeyDown={(e) => setSmartSearch(e.target.value)}
                className='col-8'
                placeholder="לדוגמא: ליל בדולח ברלין"
            />
            <span className='btn-wrapper'>
                <Button onClick={handleSmartSearch} disabled={!smartSearch}>הפעל חיפוש חכם</Button>
            </span>
        </div>
    );
};

export default EventSmartSearch;