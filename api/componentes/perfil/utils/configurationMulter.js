const multer = require('multer');
const fs = require('fs');
const controllerPerfil=require("../controller");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.FILEPATH+"/temp");
    },
    filename: (req, file, cb) => {
      // Generar un nombre único para el archivo
      const uniqueName="img-perfil-"+Date.now() + Math.random()+".png";
      cb(null, uniqueName);
    }
});
  
const fileFilter = (req, file, cb) => {
    cb(null,true);
};

const cleanFileName=(fileName)=>{
    // Eliminar caracteres que no sean letras o números
    const cleanedFileName = fileName.replace(/[^a-zA-Z0-9.]/g, '');
    
    // Reemplazar espacios en blanco por guiones
    const finalFileName = cleanedFileName.replace(/\s+/g, '-');

    return finalFileName;
}
const generateUniqueName=(fileName)=>{
    // Eliminar caracteres que no sean letras o números
    const cleanedFileName = fileName.replace(/[^a-zA-Z0-9.]/g, '');

    // Obtener la extensión del archivo
    const fileExtension = cleanedFileName.split('.').pop();
    
    // Eliminar la extensión del nombre de archivo
    const fileNameWithoutExtension = cleanedFileName.replace(`.${fileExtension}`, '');
    
    // Reemplazar espacios en blanco por guiones
    const fileNameWithHyphens = fileNameWithoutExtension.replace(/\s+/g, '-');
    
    // Agregar timestamp corto antes de la extensión
    const timestamp = Date.now();
    const uniqueFileName = `${fileNameWithHyphens}-${timestamp}.${fileExtension}`;

    return uniqueFileName;
}

module.exports = { storage, fileFilter };