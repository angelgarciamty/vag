const ffmpeg = require('fluent-ffmpeg');

function checkFFmpeg() {
  ffmpeg.getAvailableFormats((error, formats) => {
    if (error) throw error;
    if (formats.length === 0) {
      console.log('FFmpeg no está instalado o no es compatible con fluent-ffmpeg');;
    } else {
      console.log('FFmpeg está instalado y funciona con fluent-ffmpeg');
    }
  });
}

module.exports = checkFFmpeg;