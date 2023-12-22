

function generatePreviewImage(time,inputPath, outputPath, width, height) {
    return new Promise((resolve, reject) => {
      // Extraer fotograma del video
      const extractFrames = require('ffmpeg-extract-frames')
      const sharp = require('sharp');

        extractFrames({
            input: inputPath,
            output: outputPath,
            offsets: [
                time
            ]
        }).then(()=>{
            console.log("frames extraido de la imagen: "+outputPath);
            sharp(outputPath)
            .resize(width, height)
            .toFile(outputPath, (err, info) => {
            if (err) return reject(err);
            resolve(outputPath);
            });
        }).catch((error)=>{
            return reject(error);
        })

    }).then((imagePath)=>{
        console.log("se genero la miniatura correctamente");
    }).catch((error)=>{
        console.log("error generando la imagen preview");
        console.log(error);
    });
}

module.exports = generatePreviewImage;