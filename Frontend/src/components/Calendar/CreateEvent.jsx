import React from 'react';
import CreateEventForm from '../../components/CreateEventForm';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const CreateEvent = () => {
  return (
    <div className="create-event-page">
      <Header />
      <main className="main-content">
        <CreateEventForm />
      </main>
      <Footer />
    </div>
  );
};

export default CreateEvent;