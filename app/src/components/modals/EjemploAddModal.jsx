import React, { useEffect, useState } from 'react'
import ModalContainer from './ModalContainer'
import {ModalClose,ModalDialog,DialogTitle,DialogContent,Stack,FormControl, FormLabel, Input, Button } from '@mui/joy'
import { UseArchivos } from '../../hooks/UseArchivos'
import { useNavigate } from 'react-router-dom'

const EjemploAddModal = ({close}) => {

    const {addArchivo} = UseArchivos();
    const [newArchivo, setNewArchivo] = useState({
        _id:"6b01f69b-0582-4345-982d-0a0778ea9485",
        nombre:""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addArchivo(newArchivo);
        close();
    }
    
    const handleNombre = (e) => {
        setNewArchivo((prev)=>{
            return {...prev,nombre:e.target.value}
        })
    }

    return (
        <ModalContainer>
            <ModalDialog>
                <DialogTitle>Agregar Archivo</DialogTitle>
                <DialogContent>Fill in the information of the project.</DialogContent>
                <form
                    onSubmit={handleSubmit}
                >
                    <Stack spacing={2}>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input value={newArchivo.nombre} onChange={handleNombre} autoFocus required />
                    </FormControl>
                    <Button type="submit">Submit</Button>
                    </Stack>
                </form>
            </ModalDialog>
        </ModalContainer>
    )
}

export default EjemploAddModal
