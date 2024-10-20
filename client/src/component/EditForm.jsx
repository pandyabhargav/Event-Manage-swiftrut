import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditEventForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [eventData, setEventData] = useState({
    eventName: '',
    eventDate: '',
    eventTime: '',
    eventDescription: '',
    eventImage: '',
    eventLocation: '',
    eventAttendees: '',
    eventFacilities: ''
  });


  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/events/${id}`);
        setEventData(response.data);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchEventData();
  }, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/events/edit/${id}`, eventData);
      alert('Event updated successfully');
      navigate('/'); 
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event');
    }
  };

  return (
    <Container className="add-event-form">
      <h2>Edit Event</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="eventName">
          <Form.Label>Event Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter event name"
            name="eventName"
            value={eventData.eventName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="eventDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="eventDate"
            value={eventData.eventDate.split('T')[0]} 
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="eventTime">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            name="eventTime"
            value={eventData.eventTime}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="eventDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter event description"
            name="eventDescription"
            value={eventData.eventDescription}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="eventImage">
          <Form.Label>Image Location (URL)</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter image URL"
            name="eventImage"
            value={eventData.eventImage}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="eventLocation">
          <Form.Label>Event Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter event location"
            name="eventLocation"
            value={eventData.eventLocation}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="eventAttendees">
          <Form.Label>Number of Attendees</Form.Label>
          <Form.Control
            type="number"
            min="1"
            placeholder="Enter number of attendees"
            name="eventAttendees"
            value={eventData.eventAttendees}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="eventFacilities">
          <Form.Label>Facilities</Form.Label>
          <Form.Control as="select" name="eventFacilities" value={eventData.eventFacilities} onChange={handleChange} required>
            <option value="">Select a facility</option>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
            <option value="vip">VIP</option>
            <option value="vvip">VVIP</option>
          </Form.Control>
        </Form.Group>

        <Button variant="orange" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default EditEventForm;
