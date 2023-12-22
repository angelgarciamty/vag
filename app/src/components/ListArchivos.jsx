import React, { useState } from 'react';
import { UseArchivos } from '../hooks/UseArchivos';
import { Button } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import "../assets/css/archivos.css"

const ListArchivos = () => {

    const navigate = useNavigate();

    const [selection,setSelection] = useState(false);

    const {archivos,
        archivosSeleccionados,
        addArchivoSeleccionado,
        removeArchivoSeleccionado,
        selectArchivo,
        archivoSeleccionado,
        selectNextArchivo,
        selectPrevArchivo,
        removeArchivo}=UseArchivos();

    const handleSelect = (archivo) => {
        if(selection){
            if(!archivo.seleccionado){
                addArchivoSeleccionado(archivo);
            }else{
                removeArchivoSeleccionado(archivo._id);
            }
        }else{
            selectArchivo(archivo._id);
            navigate("./modal");
        }
    }

    const handleAdd = () => {
        navigate("./add");
    }

    return (
        <>  
            <span>{`Archivos Seleccionados:${archivosSeleccionados?.length+""}`}</span>
            <Button onClick={()=>setSelection((prev)=>!prev)}>seleccion:{selection?"true":"false"}</Button>
            <ul>
                {archivos.map((archivo)=>{
                    return (
                        <li key={archivo._id} style={{marginBottom:20}} className={archivo.seleccionado?"seleccionado":""}>
                            <a onClick={()=>handleSelect(archivo)} style={{cursor:"pointer"}}>
                                id:{archivo._id}, nombre:{archivo.nombre}
                            </a>
                            <a onClick={()=>removeArchivo(archivo._id)} style={{cursor:"pointer"}}>Eliminar</a>
                        </li>)
                })}
            </ul>
            <br />
            <div>
                archivo seleccionado: {archivoSeleccionado ? archivoSeleccionado.nombre : "No hay archivos"}
            </div>
            <br />
            <Button onClick={selectPrevArchivo}>
                Anterior
            </Button>
            <Button onClick={selectNextArchivo}>
                Siguiente
            </Button>
            <br />
            <Button onClick={handleAdd}>
                Agregar archivo
            </Button>
        </>
    )
}

export default ListArchivos
