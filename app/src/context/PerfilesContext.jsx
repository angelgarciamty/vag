import { createContext, useState } from "react";

export const PerfilesContext=createContext();

export const PerfilesProvider = ({children}) => {

    const [perfiles,setPerfiles]=useState([]);
    const [perfilSeleccionado,setPerfilSeleccionado]=useState({});

    const addPerfil = (nuevoPerfil) => {
        setPerfiles((prevPerfiles)=>[...prevPerfiles,nuevoPerfil]);
    }

    const removePerfil = (idPerfil) => {
        setPerfiles((prevPerfiles => {
            prevPerfiles.filter((perfil) => perfil._id !== idPerfil);
        }))
    }

    const contextData = {
        perfiles,setPerfiles,
        perfilSeleccionado,setPerfilSeleccionado,
        addPerfil, removePerfil
    }

    return (
        <PerfilesContext.Provider value={contextData}>
            {children}
        </PerfilesContext.Provider>
    )
}