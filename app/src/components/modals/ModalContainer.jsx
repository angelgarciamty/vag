import React from 'react'
import "../../assets/css/modalContainer.css"
import { Modal } from '@mui/joy'
import { useNavigate } from 'react-router-dom';
import { useState,useEffect, cloneElement } from 'react';
import { useModal } from '../../hooks/UseModal';

export default function ModalContainer({children}) {
  const [isOpen,setIsOpen]=useState(false);
  const navigate = useNavigate();

    useEffect(()=>{
        setIsOpen(true);
    },[])

    const close = () => {
      setIsOpen(false);
      setTimeout(()=>{
        navigate("../");
      },150)
    }

    const renderChildren = () => {
      return React.Children.map(children, child =>
        cloneElement(child, {
          isOpen,
          close
        })
      );
    };

  return (
    <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={close}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        className={`modal-container ${isOpen?"open":""}`}
      >
        <>
          {renderChildren()}
        </>
    </Modal>
  )
}
