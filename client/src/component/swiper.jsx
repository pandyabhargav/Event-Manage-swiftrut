import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Card, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';

import { Navbar, Nav, Container } from 'react-bootstrap';
import axios from 'axios';

const SwiperComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/events/all');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleShow = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/events/delete/${id}`);
      setEvents(events.filter(event => event._id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <section>
      <header>
        <Navbar expand="lg" className="eventbrite-navbar">
          <Container>
            <Navbar.Brand href="/" className="brand-logo d-flex justify-content-center align-items-center px-3 my-1">
              <h4>eventbrite</h4>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/" className="nav-item" >Browse Events</Nav.Link>
                <Nav.Link href="/" className="nav-item">Help</Nav.Link>
                <Nav.Link href="/" className="nav-item">Live Chat</Nav.Link>
              </Nav>
              <Nav.Link href="/AddForm" className="nav-item signup-btn">+ Add Event</Nav.Link>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <Container>
        <div className='swiper p-5'>
          <Swiper
            navigation={true}
            modules={[Navigation, Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="mySwiper rounded-3"
          >
            <SwiperSlide><img src="/images/my1.webp" alt="Event 1" /></SwiperSlide>
            <SwiperSlide><img src="/images/my2.webp" alt="Event 2" /></SwiperSlide>
            <SwiperSlide><img src="/images/my3.webp" alt="Event 3" /></SwiperSlide>
          </Swiper>
        </div>

        <div className='icons d-flex flex-wrap justify-content-center col-12 align-items-center'>
          {["microphone", "champagne-glasses", "utensils", "earth-americas", "gamepad", "globe"].map(icon => (
            <div className='bground-round rounded-circle border d-flex flex-wrap justify-content-center align-items-center border-secondary col-2' key={icon}>
              <i className={`fa-solid fa-${icon}`}></i>
            </div>
          ))}
        </div>
      </Container>

      <Container>
        <div className='col-12 d-flex flex-wrap justify-content-center align-items-center'>
          {events.map(event => (
            <div className="card col-4" key={event._id}>
              <div className="card__image">
                <img src={event.eventImage} alt={event.eventName} />
              </div>
              <div className="card__copy">
                <h3><strong>Event :</strong>{event.eventName}</h3>
                <p><strong>Description:</strong>{event.eventDescription}</p>
                <div className="d-flex justify-content-between">
                  <Button variant="" className='text-success' onClick={() => handleShow(event)}>View</Button>
                  <Link to={`/editForm/${event._id}`}>
                    <Button variant="" className='text-primary'>Edit</Button>
                  </Link>
                  <Button variant="" className='text-danger' onClick={() => handleDelete(event._id)}>Delete</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent?.eventName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={selectedEvent?.eventImage} alt={selectedEvent?.eventName} className="img-fluid mb-3" />
          <p><strong>Date:</strong> {new Date(selectedEvent?.eventDate).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {selectedEvent?.eventTime}</p>
          <p><strong>Description:</strong> {selectedEvent?.eventDescription}</p>
          <p><strong>Location:</strong> {selectedEvent?.eventLocation}</p>
          <p><strong>Attendees:</strong> {selectedEvent?.eventAttendees}</p>
          <p><strong>Facilities:</strong> {selectedEvent?.eventFacilities}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default SwiperComponent;
