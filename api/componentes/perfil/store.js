const Model=require("./model");
const modelArchivos=require("../archivo/model");
const fs = require('fs');
const modelColecciones=require("../coleccion/model");

async function getPerfiles(filtros){
    return await Model.find(filtros);
}
async function getCantidadPerfiles(){
    return await Model.countDocuments();
}
async function getPerfil(idPerfil){
    const resultado={};
    const perfil=await Model.findOne({_id:idPerfil}).lean();
    const archivos=await modelArchivos.find({id_perfil:idPerfil}).limit(4).select("nombre tipo_archivo");
    perfil.cantidad_imagenes=await modelArchivos.countDocuments({id_perfil:idPerfil,tipo_archivo:1});
    perfil.cantidad_videos=await modelArchivos.countDocuments({id_perfil:idPerfil,tipo_archivo:2});
    perfil.archivos=archivos;
    return perfil;
}
async function getLocaciones(){
    const result=await Model.aggregate([
        {
            $match: {
              locacion: { $ne: '' } // Filtra documentos donde el campo "locacion" no esté vacío
            }
        },
        {
          $group: {
            _id: '$locacion', // Agrupa por el valor de cada locación
          }
        },
        {
          $group: {
            _id: null, // Agrupa todos los registros en un solo grupo
            uniqueLocaciones: { $addToSet: '$_id' } // Crea un nuevo array con las locaciones sin repetirse
          }
        }
    ]).exec();
    const uniqueLocacionesArray = result.length > 0 ? result[0].uniqueLocaciones : [];
    return uniqueLocacionesArray;
}
function addPerfil(perfil,date){
    const modelU=new Model(perfil);
    return modelU.save().then((newPerfil)=>{
        console.log("el usuario se guardo correctamente");
        return newPerfil;
    }).catch(()=>{

    });
}
async function updatePerfil(perfil){
    // tambien se puede usar findById(id) 
    const foundPerfil= await Model.findOne({
        _id:perfil._id
    });
        // si el nombre es diferente cambiar nombre de carpeta
    if(foundPerfil.nombre!==perfil.nombre && perfil.nombre){
        fs.renameSync(process.env.FILEPATH+"/"+foundPerfil.nombre,process.env.FILEPATH+"/"+perfil.nombre)
    }
    Object.assign(foundPerfil,perfil);
    const PerfilModified= await foundPerfil.save();
    return PerfilModified;
}
function deletePerfil(id) {
    return new Promise(async (resolve, reject) => {
      try {
        // Eliminar el perfil usando await directamente
        await Model.deleteOne({ _id: id });
  
        // Obtener los archivos relacionados al perfil
        const archivos = await modelArchivos.find({ id_perfil: id });
  
        // Eliminar los archivos relacionados al perfil
        await modelArchivos.deleteMany({ id_perfil: id });
  
        // Eliminar los archivos de la colección
        for (const archivo of archivos) {
          await deleteArchivoFromColecciones(archivo._id);
        }
  
        resolve();
      } catch (error) {
        reject(error);
      }
    });
}
  
async function deleteArchivoFromColecciones(archivoId) {
    try {
      const colecciones = await modelColecciones.find();
  
      for (const coleccion of colecciones) {
        coleccion.archivos = coleccion.archivos.filter((item) => item.id_archivo.toString() !== archivoId.toString());
        await coleccion.save();
      }
    } catch (error) {
      console.error('Error al eliminar archivo de las colecciones:', error);
    }
}
async function validatePerfil(nombrePerfil){
    return await Model.findOne({ nombre: { $regex: new RegExp(`^${nombrePerfil}$`, 'i') } })
    .then((result)=>{
        if(result){
            return true;
        }else{
            return false;
        }
    }).catch((e)=>{
        return false;
    })
}

module.exports={
    addPerfil,
    getPerfil,
    getPerfiles,
    deletePerfil,
    updatePerfil,
    validatePerfil,
    getCantidadPerfiles,
    getLocaciones
}