import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 

const AddEventForm = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    eventTime: '',
    eventDescription: '',
    eventImage: '',
    eventLocation: '',
    eventAttendees: '',
    eventFacilities: '',
  });

  const navigate = useNavigate(); 


  const handleChange = (e) => {
    const { id, value } = e.target; 
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
  
      const response = await axios.post('http://localhost:3000/api/events/add', formData);
      console.log(response.data); 
      navigate('/'); 

      setFormData({ 
        eventName: '',
        eventDate: '',
        eventTime: '',
        eventDescription: '',
        eventImage: '',
        eventLocation: '',
        eventAttendees: '',
        eventFacilities: '',
      });
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <Container className="add-event-form">
      <h2>Add Event</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="eventName">
          <Form.Label>Event Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter event name"
            value={formData.eventName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="eventDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={formData.eventDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="eventTime">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            value={formData.eventTime}
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
            value={formData.eventDescription}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="eventImage">
          <Form.Label>Image Location (URL)</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter image URL"
            value={formData.eventImage}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="eventLocation">
          <Form.Label>Event Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter event location"
            value={formData.eventLocation}
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
            value={formData.eventAttendees}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="eventFacilities">
          <Form.Label>Facilities</Form.Label>
          <Form.Control
            as="select"
            value={formData.eventFacilities}
            onChange={handleChange}
            required
          >
            <option value="">Select a facility</option>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
            <option value="vip">VIP</option>
            <option value="vvip">VVIP</option>
          </Form.Control>
        </Form.Group>

        <Button variant="orange" type="submit">
          Add event
        </Button>
      </Form>
    </Container>
  );
};

export default AddEventForm;
