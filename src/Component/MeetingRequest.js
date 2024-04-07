import React, { useState } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const MeetingRequest = (props) => {
    const globalUser = JSON.parse(localStorage.getItem('user'));

    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();

    const [hasDetailsChanges, setDetailsChanges] = useState(false);
    const { selectedDate } = props;
    const [meetingDetails, setMeetingDetails] = useState({
        meetingTime: null,
        notes: '',
        password: globalUser?.password || '',
        email: globalUser?.email || '',
        phone: globalUser?.phone || ''
    });


    const { id } = useParams();

    const updateUser = async () => {
        const payload = {
            userId: globalUser?.userId,
            phone: meetingDetails?.phone,
            password: meetingDetails?.password,
            email: meetingDetails?.email,
        };
        const resp = await axios.put('https://localhost:7122/api/MeetingRequest/UpdateUser', payload);
        return resp;
    }

    const saveUser = async () => {
        const payload = {
            phone: meetingDetails?.phone,
            password: meetingDetails?.password,
            email: meetingDetails?.email,
        };

        if (globalUser?.userId) {
            if (!hasDetailsChanges) {
                submitDetails(globalUser?.userId);
                return;
            }
            updateUser();
            payload.userId = globalUser?.userId;
            localStorage.setItem('user', payload);
        }

        const resp = await axios.post('https://localhost:7122/api/MeetingRequest/SaveUser', payload);
        if (resp.data?.userid) {
            submitDetails(resp.data.userId);
            payload.userId = resp.data.userId;
            localStorage.setItem('user', JSON.stringify(payload));
        }
    };

    const submitDetails = async (userId) => {
        const year = selectedDate.getFullYear();
        const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
        const day = selectedDate.getDate().toString().padStart(2, '0');

        // Combine date and time
        // הוספנו 2 כי ב C# הנתונים נשמרים שעתיים מאוחר יותר
        const hours = parseInt(meetingDetails.meetingTime.toString().substring(0, 2)) + 2;
        const mins = meetingDetails.meetingTime.toString().slice(-2);
        const dateTime = `${year}-${month}-${day} ${hours}:${mins}:00`;

        const payload = {
            userId,
            personId: id,
            meetingDateTime: new Date(dateTime),
            personalnote: meetingDetails.notes || ''
        };
        const resp = await axios.post('https://localhost:7122/api/MeetingRequest', payload);
        if (resp.status == 200 && !showSuccess) {
            setShowSuccess(true);
        }
    };

    const onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value || '';
        if (['name', 'phone', 'password'].includes(name)) {
            setDetailsChanges(true);
        }
        setMeetingDetails({ ...meetingDetails, [name]: value })
    };

    return (
        <>
            {!showSuccess ?
                <div className="form-meeting">
                    <span>תאריך: {selectedDate.toLocaleDateString()}</span>
                    <span>שעת פגישה: <input type="time" name="meetingTime" onChange={onChange} value={meetingDetails.meetingTime} /></span>
                    <hr />
                    <div>איך ליצור איתך קשר?</div>
                    <span>מייל : <input type="text" name="email" onChange={onChange} value={meetingDetails.email} /></span>
                    <span>טלפון: <input type="tel" name="phone" onChange={onChange} value={meetingDetails.phone} /></span>
                    <span>קוד אישי : <input type="text" name="password" onChange={onChange} value={meetingDetails.password} /></span>
                    <hr />
                    <span>הערות למומחה ההסטורי</span>
                    <textarea name="notes" onChange={onChange} onKeyDown={onChange} />
                    <div className="send-btn-wrapper">
                        <Button variant="outline-danger" className="send-btn" onClick={saveUser}>שלח</Button>
                    </div>
                </div>

                : (
                    <div
                        className="modal show"
                        style={{ display: 'block', position: 'initial' }}
                    >
                        <Modal.Dialog>
                            <Modal.Header>
                                <Modal.Title>זה עבד!</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <p>פרטי הפגישה נשלחו למומחה ההסטורי</p>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="primary" onClick={() => { setShowSuccess(false); navigate('/event-search'); }}>מצוין, תודה!</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </div>
                )}
        </>
    )
}

export default MeetingRequest;