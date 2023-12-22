const Model=require("./model");

async function getColecciones(){
    let coleccionesNumArchivos=await Model.find().exec();
    let arrayNumArchivos=[];
    coleccionesNumArchivos.map((coleccion)=>{
        arrayNumArchivos.push(coleccion.archivos.length);
    })
    const colecciones = await Model.find()
    .populate({
        path:"archivos.id_archivo",
        select:"filename tipo_archivo nombre _id",
        options:{limit:4},
        populate:
        {
            path:"id_perfil",
            select:"nombre"
        },
    }).lean()
    .exec();
    try{
        colecciones.map((coleccion,index)=>{
            coleccion.numArchivos=arrayNumArchivos[index];
            coleccion.archivos=coleccion.archivos.filter((archivo)=>archivo.id_archivo!==null);
            coleccion.archivos.map((archivo) => {
                archivo.filename = archivo.id_archivo.filename;
                archivo.nombre_perfil = archivo.id_archivo.id_perfil.nombre;
                archivo.id_perfil = archivo.id_archivo.id_perfil._id;
                archivo.tipo_archivo = archivo.id_archivo.tipo_archivo;
                archivo.nombre = archivo.id_archivo.nombre;
                delete archivo.id_archivo;
                return archivo;
            });
            return coleccion;
        })
    }catch(e){
        return e;
    }
    console.log(colecciones);
    return colecciones;
}

async function getColeccion(id){
    let coleccionNumArchivos=await Model.findById(id).exec();
    let numArchivos=coleccionNumArchivos.archivos.length;
    coleccion = await Model.findById(id)
    .populate({
        path:"archivos.id_archivo",
        select:"filename tipo_archivo nombre duracion ancho alto _id hot",
        populate:
        {
            path:"id_perfil",
            select:"nombre"
        },
    }).lean()
    .exec();
    try{
        coleccion.numArchivos=numArchivos;
        coleccion.archivos.map((archivo)=>{
            archivo._id=archivo.id_archivo._id;
            archivo.filename=archivo.id_archivo.filename;
            archivo.nombre_perfil=archivo.id_archivo.id_perfil.nombre;
            archivo.id_perfil=archivo.id_archivo.id_perfil._id;
            archivo.tipo_archivo=archivo.id_archivo.tipo_archivo;
            archivo.nombre=archivo.id_archivo.nombre;
            archivo.duracion=archivo.id_archivo.duracion;
            archivo.hot=archivo.id_archivo.hot;
            archivo.ancho=archivo.id_archivo.ancho;
            archivo.alto=archivo.id_archivo.alto;
            delete archivo.id_archivo;
            return archivo;
        })

    }catch(e){
        return e;
    }
    return coleccion;
}

function addColeccion(coleccion){
    const modelU=new Model(coleccion);
    return modelU.save().then((newColeccion)=>{
        console.log("La coleccion se guardo correctamente");
        return newColeccion;
    }).catch((e)=>{
        return e;
    });
}
async function updateColeccion(coleccion){
    const foundColeccion= await Model.findOne({
        _id:coleccion._id
    });
    Object.assign(foundColeccion,coleccion);
    const coleccionModified= await foundColeccion.save();
    return coleccionModified;
}
async function addToColeccion(coleccion){
    const foundColeccion= await Model.findOne({
        _id:coleccion._id
    });
    foundColeccion.archivos=foundColeccion.archivos.concat(coleccion.archivos);
    const coleccionModified= await foundColeccion.save();
    return coleccionModified;
}
async function deleteArchivosFromColeccion(coleccion){
    const foundColeccion=await Model.findOne({
        _id:coleccion._id
    });
    foundColeccion.archivos=foundColeccion.archivos.filter(value=>!coleccion.archivos.some(value2 => value2.id_archivo === value.id_archivo.toString()));
    await foundColeccion.save();
    return foundColeccion;
}
function deleteColeccion(idColeccion){
    return Model.deleteOne({
        _id:idColeccion
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