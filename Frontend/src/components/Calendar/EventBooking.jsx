import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import BookEventForm from '../../components/BookEventForm';

const EventBooking = () => {
  return (
    <div className="event-booking-page">
      <Header />
      <main className="main-content">
        <BookEventForm />
      </main>
      <Footer />
    </div>
  );
};

export default EventBooking;