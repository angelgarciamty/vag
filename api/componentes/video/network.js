const express = require('express');
const routes = express();
const path = require('path');
const multer = require('multer');
const convertToMp4=require("./videotomp4.js");

const response=require("../../network/response.js");

const upload = multer({ dest: `${process.cwd()}/public/archivospruebas/` });

// subir video y convertir en mp4
routes.post('/', upload.single('video'), (req, res) => {
    const file = req.file;
    const inputPath = path.join(`${process.cwd()}/public/archivospruebas/`, file.filename);
    const outputPath = path.join(`${process.cwd()}/public/archivospruebas/`, `33${file.filename}.mp4`);

    convertToMp4(inputPath,outputPath).then(()=>{
        console.log("Se termino de convertir el video");
    }).catch(()=>{
        console.log("error al convertir el video a mp4");
        response.error(req,res,`Hubo un error`);
    });    
})

module.exports=routes;