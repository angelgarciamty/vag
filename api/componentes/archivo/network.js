const express = require('express');
const router = express();
router.use(express.json());
router.use(express.urlencoded());
const response=require("../../network/response");
const controller=require("./controller.js");
const multer = require('multer');
const configurationMulter=require('./utils/configuration-multer');

router.get('/',(req,res)=>{
    //opciones de peticion
    let options={};
    const orden=req.query.orden || "";
    const ordenamiento=controller.ordenamiento(orden);
    options=controller.getOptions(req);
    const random = req.query.random || undefined;
    const limite=parseInt(req.query.limit) || undefined;
    controller.getArchivos(options,ordenamiento,limite,random).then((archivos)=>{
        response.success(req,res,archivos,200,archivos.length);
    }).catch((e)=>{
        response.error(req,res,"No se pudieron obtener los archivos");
    })
});
router.get("/cantidadImgVid",(req,res)=>{
    controller.getTiposArchivos().then((resultado)=>{
        response.success(req,res,resultado,200);
    })
})
router.get("/tags",(req,res)=>{
    controller.getTags().then((resultado)=>{
        response.success(req,res,resultado,200);
    })
})
router.post("/",(req,res)=>{
    const { storage, fileFilter } = configurationMulter;
    const upload = multer({ storage, fileFilter }).single('archivo');
    // si no hay archivo no hacemos nada
    upload(req,res,(error)=>{
        if(!error){
            controller.addArchivo(req.file,req.body).then((result)=>{
                console.log("archivo guardado");
                response.success(req,res,result,200);
            }).catch((error)=>{
                console.log("error en archivo:"+ error);
                response.error(req,res,"error al añadir archivo tipo imagen",500);
            })
        }else{
            console.log("error en archivo");
            response.error(req,res,"Un archivo con este nombre ya existe",500);
        }
    })
})
router.put("/",(req,res)=>{
    const archivo=req.body;
    controller.updateArchivo(archivo).then((result)=>{
        response.success(req,res,result,200);
    }).catch((e)=>{
        response.error(req,res,"Error al modificar el archivo",500,e);
    })
})
router.delete("/:id",(req,res)=>{
    controller.deleteArchivo(req.params.id).then(()=>{
        response.success(req,res,`Archivo ${req.params.id} eliminado correctamente`);
    }).catch((e)=>{
        response.error(req,res,"Error al eliminar el archivo",500,e);
    })
});

module.exports=router;