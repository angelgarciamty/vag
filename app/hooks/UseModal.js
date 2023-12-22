import { useContext } from "react";
import { ModalContext } from "../src/context/ModalContext";

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal debe ser utilizado dentro de un ModalProvider');
    }
    return context;
};