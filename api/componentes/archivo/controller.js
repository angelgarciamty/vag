const db=require("./store.js");
const fecha=require("../../utils/fecha.js");
const image_utils=require("./utils/images-utils.js");
const sizeOf = require('image-size')
const imageFormats = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
const videoFormats = ['mp4', 'avi', 'mov', 'mkv', 'wmv','webm'];
const fs = require('fs');
const sharp = require('sharp');
const { get } = require("http");
const controllerPerfil=require("../../componentes/perfil/controller.js");
const ObjectId = require('mongoose').Types.ObjectId;
const ffmpeg = require('fluent-ffmpeg');

function getArchivos(filtros,ordenamiento,limite,random){
    return new Promise((resolve,reject)=>{
        const archivos=db.getArchivos(filtros,ordenamiento,limite,random);
        resolve(archivos,archivos.length);
    })
}

function getInfoArchivo(id){
    return db.getInfoArchivo(id);
}

function getTiposArchivos(){
    return new Promise((resolve,reject)=>{
        const resultado=db.getTiposArchivos();
        resolve(resultado);
    })
}
function getTags(){
    return new Promise((resolve,reject)=>{
        const resultado=db.getTags();
        resolve(resultado);
    })
}
function addArchivo(req_file,req_body){
    return new Promise(async(resolve, reject)=>{
        let result={};
        let archivo={};
        archivo.id_perfil=req_body.id_perfil;
        archivo.filename=req_file.filename;
        const arrayfilename=req_file.filename.split(".");
        archivo.nombre=arrayfilename.slice(0, arrayfilename.length - 1).join('.');
        archivo.size=req_file.size;
        archivo.extension=req_file.filename.split(".").pop();
        archivo.fecha_crea=archivo.fecha_mod=fecha();
        archivo.timestamp=new Date().getTime();
        if(imageFormats.includes(archivo.extension.toLowerCase())){// es imagen
            archivo.tipo_archivo=1;
            const dimensions = sizeOf(req_file.path);
            archivo.ancho = dimensions.width;
            archivo.alto = dimensions.height;
            archivo.proporcion = archivo.ancho / archivo.alto;
            archivo.resolucion=archivo.ancho*archivo.alto;
            const perfil=await controllerPerfil.getPerfilSync(archivo.id_perfil);
            const nombrePerfil=perfil.nombre;
            generateThumbnailImage(archivo,nombrePerfil,400).then(async()=>{
                result=await db.addArchivo(archivo);
                resolve(result);
            }).catch((e)=>{
                reject(e);
            })
        }else if(videoFormats.includes(archivo.extension.toLowerCase())){ // es video
            archivo.tipo_archivo=2;
            if(archivo.extension==="mp4"){
                try{
                    archivo=await getMetaVideo(req_file.path,archivo);
                }catch(e){
                    reject(e);
                }
                const [inicioGif,duracionGif]=await generateInicioGif(archivo.duracion,6);
                const thumbFilename=`thumb_${req_file.filename.replace(/\.[^.]+$/,"")}.jpg`;
                const thumbImagePath = req_file.path.replace(archivo.filename,thumbFilename);
                generateThumbnailVideo(req_file.path,thumbImagePath,Math.ceil(archivo.duracion/2)).then(()=>{
                    generateGif(req_file.path,req_file.path.replace(/\.[^.]+$/, '.gif'),inicioGif,duracionGif,8).then(async()=>{
                        result=await db.addArchivo(archivo);
                        resolve(result);
                    }).catch((e)=>{
                        console.log("error al generar el gif:"+e);
                        reject(e)
                    });
                }).catch((e)=>{
                    console.log(e);
                    reject(e);
                })
            }else{

            }
            
            
        }else{// es otro tipo de archivo
            console.log("es otro tipo de archivo");
        }
        resolve(result);
    })
}
const generateInicioGif=(duracionVideo,duracionGif)=>{
    let inicio=0;
    if(duracionGif>duracionVideo){
        inicio=0;
        duracionGif=duracionVideo;
    }else{
        inicio=(duracionVideo/2)-(duracionGif/2);//4.5-3= 1.5
    }
    return [inicio,duracionGif];
}
const getMetaVideo=(url,archivo)=>{
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(url, (err, info) => {
            if(err){
                reject(err);
            }else{
                info.streams.every((stream)=>{
                    if(stream.codec_type==="video"){
                        archivo.ancho=stream.coded_width || stream.width || 0;
                        archivo.alto=stream.coded_height || stream.height || 0;
                        archivo.codec=stream.codec_name || "";
                        archivo.proporcion = archivo.ancho / archivo.alto;
                        archivo.resolucion=archivo.ancho*archivo.alto;
                        return false;
                    }
                })
                archivo.duracion=info.format.duration || info.streams[0].duration || 0;
                resolve(archivo);
            }
        });
    });
}
const generateGif = (rutaVideo, rutaGif, inicio, duracion, fps) => {
    return new Promise((resolve, reject) => {
        ffmpeg(rutaVideo)
        .setStartTime(inicio)
        .setDuration(duracion)
        .outputOptions("-vf", `scale=250:-1:flags=lanczos,fps=${fps}`)
        .save(rutaGif)
        .on("end",()=>{
            resolve();
        })
    });
};
function updateArchivo(archivo){
    return new Promise(async(resolve,reject)=>{
        archivo.fecha_mod=fecha();
        if(archivo._id.length==0 || archivo == null){
            reject("Invalid data");
            return false;
        }
        const result=await db.updateArchivo(archivo);
        resolve(result);
    })
}

function deleteArchivo(id){
    return new Promise(async(resolve,reject)=>{
        if(!id){
            reject("Id invalido");
            return false;
        }
        const infoArchivo=await getInfoArchivo(id);
        const nombrePerfil=infoArchivo.id_perfil.nombre;
        const filename=infoArchivo.filename;
        deleteFile(nombrePerfil,filename).then(()=>{
            db.deleteArchivo(id).then(()=>{
                resolve();
            }).catch(e=>{
                reject(e);
            });
        }).catch((e)=>{
            reject(e);
        })
    });
}
function deleteFile(nombrePerfil, filename){
    return new Promise((resolve,reject)=>{
        fs.unlink(process.env.FILEPATH+"/"+nombrePerfil+"/"+filename, (error) => {
            if (error) {
              console.log('Error al eliminar el archivo:', error);
              reject(error);
            } else {
              resolve();
            }
        });
    })
}
function generateThumbnailImage(image,nombrePerfil,maxSize){
    return new Promise((resolve,reject)=>{
        const imagePath=process.env.FILEPATH+"/"+nombrePerfil+"/"+image.filename;
        const thumbnailPath=process.env.FILEPATH+"/"+nombrePerfil+"/thumb_"+image.nombre+".jpg";
        sharp(imagePath)
        .resize(maxSize, maxSize, {
            fit: 'inside',
            withoutEnlargement: true
        }) // Define el tamaño del thumbnail
        .toFile(thumbnailPath, (err, info) => {
            if (err) {
                reject(err);
            } else {
                // El thumbnail se generó correctamente
                resolve();
            }
        });
    })
}
const generateThumbnailVideo = (videoPath, outputPath, time) => {
    return new Promise((resolve, reject) => {
      ffmpeg(videoPath)
        .seekInput(time) // Establece el tiempo del frame deseado (en segundos o 'hh:mm:ss' formato)
        .frames(1) // Captura solo un frame
        .size(`300x?`)
        .output(outputPath)
        .on('end', () => {
          resolve();
        })
        .on('error', (err) => {
          reject(err);
        })
        .run();
    });
};
function ordenamiento(orden){
    let ordenamiento={};
    if(orden==="mejor-resolucion"){
        ordenamiento.resolucion=-1;
    }else if(orden==="horizontales"){
        ordenamiento.proporcion=-1;
    }else if(orden==="verticales"){
        ordenamiento.proporcion=1;
    }else if(orden==="mas-nuevo"){
        ordenamiento.timestamp=-1;
    }else if(orden==="mas-viejo"){
        ordenamiento.timestamp=1;
    }else if(orden==="mas-hot"){
        ordenamiento.hot=-1;
    }else if(orden==="duracion"){
        ordenamiento.duracion=-1;
    }else{
        ordenamiento._id=1;
    }
    return ordenamiento;
}
function getOptions(req){
    const options={};
    if (req.query.idPerfil) {
        options.id_perfil = ObjectId(req.query.idPerfil);
    }
    if(req.query.tipoArchivo){
        options.tipo_archivo = parseInt(req.query.tipoArchivo);
    }
    if(req.query.nsfw){
        if(req.query.nsfw==="1"){
            options.nsfw = true;
        }else if(req.query.nsfw==="0"){
            options.nsfw = false;
        }
    }
    if(req.query.ia){
        if(req.query.ia==="1"){
            options.ia = true;
        }else if(req.query.ia==="0"){
            options.ia = false;
        }
    }
    //tags /api/archivos?tags=tag1,tag2,tag3
    if(req.query.tags){
        const tags=req.query.tags.split(",");
        options.tags={ $in: tags };
    }
    return options;
}
module.exports={
    addArchivo,
    getArchivos,
    getInfoArchivo,
    updateArchivo,
    deleteArchivo,
    ordenamiento,
    getOptions,
    getTiposArchivos,
    getTags
}