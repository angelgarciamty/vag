import React, { useEffect, useState } from 'react'
import ModalContainer from './ModalContainer'
import {ModalClose,ModalDialog,DialogTitle,DialogContent,Stack,FormControl, FormLabel, Input, Button } from '@mui/joy'
import { UseArchivos } from '../../hooks/UseArchivos'
import { useModal } from '../../hooks/UseModal'
import { useNavigate } from 'react-router-dom'

const EjemploModal = ({close}) => {
    const navigate=useNavigate();
    const {closeModal} = useModal();

    const {archivoSeleccionado,modifyArchivo} = UseArchivos();
    const [newArchivo, setNewArchivo] = useState(archivoSeleccionado);

    const handleSubmit = (e) => {
        e.preventDefault();
        modifyArchivo(newArchivo);
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
                <DialogTitle>Create new project</DialogTitle>
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

export default EjemploModal
