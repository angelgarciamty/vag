import { useContext } from "react";
import ArchivosContext from "../context/ArchivosContext";

export const UseArchivos = () => {
    const context = useContext(ArchivosContext);
    if (!context) {
        throw new Error('useModal debe ser utilizado dentro de un ModalProvider');
    }
    return context;
}