import { useContext } from "react"
import { PerfilesContext } from "../context/PerfilesContext"

export const UsePerfiles = () => {
    const context = useContext(PerfilesContext);
    if (!context) {
        throw new Error('useModal debe ser utilizado dentro de un ModalProvider');
    }
    return context;
}