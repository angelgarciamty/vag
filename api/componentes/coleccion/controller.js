const db=require("./store");
const fecha=require("../../utils/fecha");

function getColecciones(ordenamiento){
    return new Promise((resolve,reject)=>{
        resolve(db.getColecciones());
    })
}
function getColeccion(id){
    return new Promise((resolve,reject)=>{
        resolve(db.getColeccion(id));
    })
}
function addColeccion(coleccion){
    return new Promise((resolve,reject)=>{
        coleccion.fecha_crea=coleccion.fecha_mod=fecha();
        db.addColeccion(coleccion).then((result)=>{
            resolve(result);
        }).catch((e)=>{
            reject(e);
        })
    })
}
function updateColeccion(coleccion){
    return new Promise((resolve,reject)=>{
        coleccion.fecha_mod=fecha();
        resolve(db.updateColeccion(coleccion));
    })
}
function addToColeccion(coleccion){
    return new Promise((resolve,reject)=>{
        resolve(db.addToColeccion(coleccion));
    })
}
function deleteArchivosFromColeccion(coleccion){
    return new Promise((resolve,reject)=>{
        resolve(db.deleteArchivosFromColeccion(coleccion));
    })
}
function deleteColeccion(idColeccion){
    return new Promise((resolve,reject)=>{
        if(!idColeccion){
            reject("Id invalido");
            return false;
        }
        db.deleteColeccion(idColeccion).then(()=>{
            resolve();
        }).catch((e)=>{
            reject(e);
        })
    })
}
module.exports={
    getColecciones,
    getColeccion,
    addColeccion,
    updateColeccion,
    deleteColeccion,
    addToColeccion,
    deleteArchivosFromColeccion
}