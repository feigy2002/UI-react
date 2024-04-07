import React, { useState, useEffect } from 'react';
import EventsList from './EventsList';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { getYearsList } from '../Utils/globalUtils';
import EventSmartSearch from './EventSmartSearch';

const SearchEvent = () => {
  const [citySearch, setCitySearch] = useState('a');
  const [eventsList, seteventsList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchResultCity, setCitySearchResult] = useState([]);
  const [startYear, setStartYear] = useState();
  const [endYear, setEndYear] = useState();


  useEffect(() => {
    const cities = require("cities-list");
    setCityList(Object.keys(cities || {}));
  }, []);

  const handleSearchByCity = () => {
    setCitySearchResult(cityList
      ?.filter((c) => c?.toLocaleLowerCase().startsWith(citySearch?.toLocaleLowerCase()))
      ?.slice(0, 600)
    );
    setSelectedCity(null);
  };

  const getEventsByCity = async (selection) => {
    setSelectedCity(selection);
  };

  useEffect(() => {
    if (searchResultCity?.lentgh === 1) {
      getEventsByCity(searchResultCity[0]);
    }
  }, [searchResultCity]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://localhost:7122/api/Event/searchEvent?fromYear=${startYear || -1}&toYear=${endYear || -1}&city=${selectedCity || ''}`);
      const jsonData = await response.json();
      seteventsList(jsonData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='search-container row'>
      <div className='col-4'>
        <h3>חפש אירוע או אישיות מפורסמת</h3>
        <div className='search-option'>
          <span className='search-title'>חפש עיר באנגלית</span>
          <div className='row'>
            <input
              type='text'
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
              onKeyDown={handleSearchByCity}
              className='col-4'
            />
            <DropdownButton
              id="dropdown-city"
              title={`עיר: ${selectedCity || 'בחר'}`}
              onSelect={(selection) => setSelectedCity(selection)}
              className='col-4'
              variant='outline-secondary'
            >
              {searchResultCity.map((city) => (
                <Dropdown.Item href="#" key={city} eventKey={city}>{city || ''}</Dropdown.Item>
              ))}
            </DropdownButton>

          </div>
        </div>
        <div>
          <span className='search-title'>שנת הארוע</span>
          <div className='row search-option'>
            <div className='col-4'>
              <span>החל מ</span>
              <DropdownButton
                id="dropdown-year"
                title={`שנה: ${startYear || 'בחר שנה'}`}
                onSelect={(selection) => setStartYear(selection)}
                className='col-3'
                variant='outline-secondary'
              >
                {getYearsList().map((year) => (
                  <Dropdown.Item href="#" key={year} eventKey={year}>{year || ''}</Dropdown.Item>
                ))}
              </DropdownButton>
            </div>
            <div className='col-4'>
              <span>עד</span>
              <DropdownButton
                id="dropdown-end-y"
                title={`שנה: ${endYear || 'בחר שנה'}`}
                onSelect={(selection) => setEndYear(selection)}
                className='col-3'
                variant='outline-secondary'
              >
                {getYearsList(startYear).map((endYear) => (
                  <Dropdown.Item href="#" key={endYear} eventKey={endYear}>{endYear || ''}</Dropdown.Item>
                ))}
              </DropdownButton>
            </div>
          </div>
        </div>
        <span className='btn-wrapper'>
          <Button onClick={handleSearch} disabled={!((startYear && endYear) || selectedCity)}>חפש </Button>
        </span>
        <hr />
        <EventSmartSearch seteventsList={seteventsList} />
      </div>
      <div className='col-8'><EventsList eventsList={eventsList} /></div>
    </div>
  )
}

export default SearchEvent;
