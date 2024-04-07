import React, { useState, useEffect } from 'react';
import {
  useParams, useNavigate
} from "react-router-dom";
import { MeetingCalendar } from './MeetingCalendar';
import TermsConditions from './TermsConditions';

const EventTalk = () => {
  const [person, setPerson] = useState();

  const { id } = useParams();

  const loadPersonDetails = async () => {
    try {
      //חיבור API
      const response = await fetch(`https://localhost:7122/api/Person/${id}`);
      const _person = await response.json();
      setPerson(_person);
      console.log(person);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (id !== null) {
      loadPersonDetails();
    }
  }, [])


  return !id ? <TermsConditions />
    : (
      <>
        <div className='person-details'>
          <div className='details-center'>
            <div>
              <span className="bigger-text">{person?.peopleName}</span>
              <span className='bigger-note'>{`(${person?.peopleRole})`}</span>
            </div>
            <div className='label-details'><b>טלפון: </b>{person?.phone}</div>
            <div className='label-details'><b>אימיל: </b>{person?.email}</div>
          </div>
        </div>
        <MeetingCalendar />
      </>
    )
}

export default EventTalk;
