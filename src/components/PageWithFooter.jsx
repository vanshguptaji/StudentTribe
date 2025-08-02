import React from 'react';
import Footer from './components/Footer';

export default function PageWithFooter({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
