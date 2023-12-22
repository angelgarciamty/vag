const express = require('express');
const router = express();
router.use(express.json());
router.use(express.urlencoded());

const response=require("../../network/response");
const controller=require("./controller.js");

router.get("/",(req,res)=>{
    ordenamiento={};
    if(req.query.id){
        controller.getColeccion(req.query.id).then((coleccion)=>{
            response.success(req,res,coleccion,200,coleccion.length);
        }).catch((e)=>{
            response.error(req,res,"No se pudo obtener la coleccion");
        });
    }else{
        controller.getColecciones(ordenamiento).then((colecciones)=>{
            response.success(req,res,colecciones,200,colecciones.length);
        }).catch((e)=>{
            response.error(req,res,"No se pudieron obtener los archivos");
        });
    }
})
router.post("/",(req,res)=>{
    const coleccion=req.body;
    controller.addColeccion(coleccion).then((result)=>{
        response.success(req,res,result,200,result.length);
    }).catch((e)=>{
        response.error(req,res,"No se pudo agregar la colecion");
    });
})
router.put("/",(req,res)=>{
    const coleccion=req.body;
    controller.updateColeccion(coleccion).then((result)=>{
        response.success(req,res,result,200,result.length);
    }).catch((e)=>{
        response.error(req,res,"No se actualizo la coleccion "+e);
    })
})
router.patch("/",(req,res)=>{
    const coleccion=req.body;
    controller.addToColeccion(coleccion).then((result)=>{
        response.success(req,res,result,200,result.length);
    }).catch((e)=>{
        response.error(req,res,"No se actualizo la coleccion "+e);
    })
})
router.patch("/deleteArchivos",(req,res)=>{
    const coleccion=req.body;
    controller.deleteArchivosFromColeccion(coleccion).then((result)=>{
        response.success(req,res,result,200,result.length);
    }).catch((e)=>{
        response.error(req,res,"No se actualizo la coleccion "+e);
    })
})
router.delete("/:id",(req,res)=>{
    const idColeccion=req.params.id;
    controller.deleteColeccion(idColeccion).then(()=>{
        response.success(req,res,"Se elimino la coleccion correctamente");
    }).catch((e)=>{
        response.error(req,res,"No se pudo eliminar la coleccion");
    })
})
module.exports=router;