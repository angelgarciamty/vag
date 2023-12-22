import { createContext, useState } from "react";
import { arrayprueba } from "../utils/ArrayPrueba";

export const ArchivosContext = createContext();

export const ArchivosProvider = ({children}) => {

  const [archivos,setArchivos]=useState(arrayprueba);
  const [archivoSeleccionado,setArchivoSeleccionado]=useState(archivos[0]);
  const [archivosSeleccionados,setArchivosSeleccionados]=useState([]);

  const addArchivo = (nuevoArchivo) => {
    setArchivos((prevArchivos) => [...prevArchivos, nuevoArchivo]);
  };

  const addArchivoSeleccionado = (archivo) => {
    setArchivos((prevArchivos)=>{
      const index=findIndexArchivos(archivo._id);
      prevArchivos[index].seleccionado=true;
      return prevArchivos;
    })
    setArchivosSeleccionados(prev=>[...prev,archivo]);
  }

  const modifyArchivo = (nuevoArchivo) => {
    if (archivoSeleccionado._id) {
      const indiceArchivo = findIndexArchivos(archivoSeleccionado._id);
      setArchivos((prevArchivos) => {
        const nuevosArchivos = [...prevArchivos];
        nuevosArchivos[indiceArchivo] = nuevoArchivo;
        return nuevosArchivos;
      });
      setArchivoSeleccionado(nuevoArchivo);
    }
  };

  const removeArchivo = (archivoId) => {
    setArchivos((prevArchivos) => {
      const indexArchivoSeleccionado = findIndexArchivos(archivoSeleccionado._id);
      const nuevosArchivos = prevArchivos.filter((archivo) => archivo._id !== archivoId);
      setArchivosSeleccionados((prevPrevArchivos)=>{
        return prevPrevArchivos.filter((archivo)=>archivo._id !== archivoId);
      })
      if (archivoSeleccionado._id === archivoId) {
        // El archivo que se está eliminando es el mismo que está seleccionado
        
        if (nuevosArchivos.length > 0) {
          // Si hay más elementos en la lista, selecciona el siguiente
          const nextIndex = indexArchivoSeleccionado % nuevosArchivos.length;
          setArchivoSeleccionado(nuevosArchivos[nextIndex]);
        } else {
          // Si no hay más elementos, establece el archivo seleccionado como vacío o null según tu lógica
          setArchivoSeleccionado(null); // o setArchivoSeleccionado({});
        }
      }
  
      return nuevosArchivos;
    });
  };

  const removeArchivoSeleccionado = (idArchivo) => {
    setArchivos((prevArchivos)=>{
      const index=findIndexArchivos(idArchivo);
      prevArchivos[index].seleccionado=false;
      return prevArchivos;
    })
    setArchivosSeleccionados((prevArchivos)=>{
      return prevArchivos.filter((archivo)=>archivo._id !== idArchivo);
    })
    
  }

  const selectArchivo = (idArchivo) => {
    const archivo= archivos.find((archivo)=>archivo._id === idArchivo);
    setArchivoSeleccionado(archivo);
  }

  const findIndexArchivos = (archivoId) => {
    return archivos.findIndex((archivo) => archivo._id === archivoId);
  };

  const selectNextArchivo = () => {
    const currentIndex = findIndexArchivos(archivoSeleccionado._id);
    const nextIndex = (currentIndex + 1) % archivos.length;
    setArchivoSeleccionado(archivos[nextIndex]);
  }

  const selectPrevArchivo = () => {
    const currentIndex = findIndexArchivos(archivoSeleccionado._id);
    const prevIndex = (currentIndex - 1 + archivos.length) % archivos.length;
    setArchivoSeleccionado(archivos[prevIndex]);
  }
  
  const contextData={
    archivos, setArchivos,
    archivosSeleccionados,
    archivoSeleccionado, setArchivoSeleccionado,
    addArchivo,
    modifyArchivo,
    removeArchivo,
    selectArchivo,
    selectNextArchivo, selectPrevArchivo,
    addArchivoSeleccionado,removeArchivoSeleccionado
  }

  return (
    <ArchivosContext.Provider value={contextData}>
      {children}
    </ArchivosContext.Provider>
  )
}

export default ArchivosContext;
