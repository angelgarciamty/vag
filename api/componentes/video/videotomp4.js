const ffmpeg = require('fluent-ffmpeg');
const generatePreviewImage=require("./generatepreviewvideo.js");
const getVideoData=require("./getvideodata.js");

var videoData=[];

function convertToMp4(inputPath,outputPath){
    return new Promise((resolve, reject) => {
         // Crea una instancia de FFmpeg
        const command = ffmpeg(inputPath);

        // Configura la salida del vídeo como MP4pero 
        command.output(outputPath).format('mp4');

        // Muestra el progreso al convertir el vídeo a MP4
        command.on('progress', progress => {
            console.log('Processing: ' + progress.percent + '% done');
        });
        command.on('codecData', codecData => {
            console.log(`Información del codec: ${codecData.audio}`);
            console.log(`Información del codec: ${codecData.video}`);
        });
        command.on('end',() => {
            resolve();
        });
        command.on('error',(error) => {
            console.log("Error al convertir el archivo en mp4");
            return reject(error);
        });
        // Ejecuta el comando de FFmpeg
        command.run((error, result) => {});
    }).then(()=>{
        //elimina video que se convirtio
        const fs = require('fs');
        fs.unlink(inputPath, (error) => {
            if (error) {
            console.error(error);
            }
        });

        async function esperar(){
            videoData = await getVideoData(outputPath);
            await generatePreviewImage(videoData.format.duration/2,outputPath,inputPath+".jpg",200,200);
        }
        esperar();

        /*const sql = 'INSERT INTO videos SET ?';
        const data = {
        name: file.originalname,
        type: file.mimetype,
        size: file.size
        };
        connection.query(sql, data, (error, results) => {
        if (error) throw error;
        return 'Vídeo guardado en la base de datos correctamente';
        });*/
        
    }).then((result)=>{
        console.log(result);
    });
};

function convertToMp4(parametro, callback){
    getVideoData(parametro,function(){
        generatePreviewImage(parametro,function(){
            console.log("terminamos!!");
        })
    })
}

module.exports=convertToMp4;


