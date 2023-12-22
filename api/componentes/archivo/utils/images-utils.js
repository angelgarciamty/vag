const sharp=require('sharp');

function getImageSize(imagePath) {
    return sharp(imagePath)
      .metadata()
      .then(metadata => {
        const width = metadata.width;
        const height = metadata.height;
        return { width, height };
      });
}

module.exports={getImageSize};