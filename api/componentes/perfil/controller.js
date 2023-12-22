const db=require("./store.js");
const fecha=require("../../utils/fecha.js");
const fs = require('fs');
const rimraf = require('rimraf');

function getPerfiles(filtros){
    return new Promise((resolve,reject)=>{
        resolve(db.getPerfiles(filtros));
    })
}

function getPerfil(idPerfil){
    return new Promise((resolve,reject)=>{
        resolve(db.getPerfil(idPerfil));
    })
}

function getCantidadPerfiles(){
    return new Promise((resolve,reject)=>{
        resolve(db.getCantidadPerfiles());
    })
}

async function getPerfilSync(idPerfil){
    return await db.getPerfil(idPerfil);
}

async function getLocaciones(){
    return await db.getLocaciones();
}

function addPerfil(perfil){
    return new Promise((resolve, reject)=>{
        validatePerfil(perfil).then(async(result)=>{
            if(!result){
                // crear carpeta para guardar archivos
                const rutaCarpeta=process.env.FILEPATH+"/"+perfil.nombre;
                if (!fs.existsSync(rutaCarpeta)) {
                    fs.mkdirSync(rutaCarpeta);
                    console.log('La carpeta se ha creado correctamente.');
                } else {
                    console.log('La carpeta ya existe.');
                }
                // Crear la nueva fecha en el formato deseado
                perfil.fecha_crea=perfil.fecha_mod=fecha();
                const result= await db.addPerfil(perfil);
                resolve(result);
            }else{
                reject("ya existe el usuario");
                console.log("ya existe el usuario");
            }
        });
    })
}

function validatePerfil(perfil){
    return new Promise((resolve,reject)=>{
        const nombre=perfil.nombre;
        resolve(db.validatePerfil(nombre));
    })
}

function updatePerfil(perfil){
    return new Promise(async (resolve,reject)=>{
        perfil.fecha_mod=fecha();
        if(perfil._id.length==0 || perfil == null){
            reject("Invalid data");
            return false;
        }
        const result=await db.updatePerfil(perfil);
        resolve(result);
    })
}


function deletePerfil(id){
    return new Promise((resolve,reject)=>{
        if(!id){
            reject("Id invalido");
            return false;
        }
        getPerfil(id).then((result)=>{
            const rutaCarpeta=process.env.FILEPATH+"/"+result.nombre;
            try {
                // Eliminar la carpeta y su contenido de forma síncrona
                rimraf.sync(rutaCarpeta);
                console.log('La carpeta se ha eliminado correctamente.');
                return result._id;
            } catch (error) {
                reject("Error al eliminar el archivo");
                return false;
                console.error('Error al eliminar la carpeta:', error);
            }
        }).then((idPerfil)=>{
            db.deletePerfil(idPerfil).then(()=>{
                resolve();
            }).catch(e=>{
                reject(e);
            });
        });
    });
}
function getFiltros(req){
    filtros={}
    if(req.query.locacion){
        filtros.locacion=req.query.locacion;
    }
    if(req.query.conocida){
        if(req.query.conocida==="1"){
            filtros.conocida=true;
        }else if(req.query.conocida==="0"){
            filtros.conocida=false;
        }
    }
    if(req.query.search){
        filtros.nombre={ $regex: req.query.search, $options: "i" }
    }
    return filtros;
}

module.exports={
    addPerfil,
    getPerfil,
    getPerfilSync,
    getPerfiles,
    deletePerfil,
    updatePerfil,
    getFiltros,
    getCantidadPerfiles,
    getLocaciones
}