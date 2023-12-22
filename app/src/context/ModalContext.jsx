import React, { createContext, useEffect, useState } from 'react';
import ModalContainer from '../components/modals/ModalContainer';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [isModalOpen, setModalOpen] = useState(false);  
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
  
    return (
      <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
        {children}
      </ModalContext.Provider>
    );
};