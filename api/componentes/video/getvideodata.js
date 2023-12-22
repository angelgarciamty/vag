function getVideoData(inputPath) {
    return new Promise((resolve, reject) => {
        const ffmpeg = require('fluent-ffmpeg');
        ffmpeg.ffprobe(inputPath, (err, data) => {
            resolve(data);
        });
    }).then((data)=>{
        return data;
    });
}

module.exports = getVideoData;