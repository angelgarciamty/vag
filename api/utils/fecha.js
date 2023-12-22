function fecha(){
    const opcionesFormato = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };
    const date=new Date();
    return date.toLocaleString('es-ES', opcionesFormato);
}
module.exports=fecha;