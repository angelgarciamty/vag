const express = require('express');
const router = express();
router.use(express.json());
router.use(express.urlencoded());
const response=require("../../network/response");
const controller=require("./controller.js");

router.get('/',(req,res)=>{
    controller.getConfig().then((result)=>{
        response.success(req,res,result,200);
    })
});
router.get('/cantidadPerfiles',(req,res)=>{
    controller.getConfig().then((result)=>{
        response.success(req,res,{imagenes:result},200);
    })
});
router.post("/",(req,res)=>{
    const config=req.body;
    controller.addConfig(config).then(()=>{
        response.success(req,res,"Configuracion añadido correctamente");
    }).catch((error)=>{
        response.error(req,res,"error al añadir configuracion");
    })
})
router.put("/",(req,res)=>{
    const config=req.body;
    controller.updateConfig(config).then(()=>{
        response.success(req,res, "Configuracion modificado correctamente");
    }).catch((error)=>{
        response.error(req,res,"error al modificar el configuracion");
    })
})

module.exports=router;