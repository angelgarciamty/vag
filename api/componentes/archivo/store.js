const Model=require("./model");

/*async function getArchivos(filtros,ordenamiento){
    const results=await Model.find(filtros)
    .populate("id_perfil")
    .sort(ordenamiento)
    .exec();
    return results;
}*/
async function getArchivos(filtros, ordenamiento,limite,random) {
    const cantidad=await Model.countDocuments().exec();
    const posibilidades=limite || cantidad;
    let arrayQuery=[
        { $match: filtros },
        { $lookup: { from: "perfiles", localField: "id_perfil", foreignField: "_id", as: "perfil" } },
        { $unwind: "$perfil" },
        {$sort:ordenamiento},
        {
            $addFields: {
                "nombre_perfil": "$perfil.nombre"
            }
        },
        {
            $project: {
                "perfil": 0
            }
        }
    ];
    if(limite){
        arrayQuery=[...arrayQuery.slice(0,4),{$limit:random ? cantidad : limite},...arrayQuery.slice(4)];
    }
    if(random){
        arrayQuery.push({$sample:{size:posibilidades}});
    }
    const results = await Model.aggregate(arrayQuery).exec();
    return results;
}
async function getInfoArchivo(id){
    const result=await Model.findOne({_id:id}).populate("id_perfil");
    return result;
}
async function getTags(){
    const result=await Model.aggregate([
        {
            $unwind:"$tags"
        },
        {
            $group: {
                _id: '$tags', // Agrupa por el valor de cada tag
            }
        },
        {
            $group: {
              _id: null, // Agrupa todos los registros en un solo grupo
              uniqueTags: { $addToSet: '$_id' } // Crea un nuevo array con los strings sin repetirse
            }
        }

    ]).exec();
    const uniqueTagsArray = result.length > 0 ? result[0].uniqueTags : [];
    return uniqueTagsArray;
}
function addArchivo(archivo){
    const modelU=new Model(archivo);
    return modelU.save().then((newArchivo)=>{
        console.log("el archivo se guardo correctamente");
        return newArchivo;
    }).catch((e)=>{
        console.log("el archivo "+archivo.filename+"no se guardo correctamente:"+archivo.ancho+"x"+archivo.alto+"="+archivo.proporcion+"-"+e);
    });
}
async function updateArchivo(archivo){
    const foundArchivo= await Model.findOne({
        _id:archivo._id
    });
    Object.assign(foundArchivo,archivo);
    const ArchivoModified= await foundArchivo.save();
    return ArchivoModified;
}
function deleteArchivo(id){
    return Model.deleteOne({
        _id:id
    })
}
async function getTiposArchivos(){
        const resultado={
            imagenes:0,
            videos:0
        }
        resultado.imagenes= await Model.countDocuments({ tipo_archivo: 1 });
        resultado.videos = await Model.countDocuments({ tipo_archivo: 2 });
        return resultado;
}

module.exports={
    addArchivo,
    getArchivos,
    getInfoArchivo,
    updateArchivo,
    deleteArchivo,
    getTiposArchivos,
    getTags
}