const express = require('express');
const router = express();
router.use(express.json());
router.use(express.urlencoded());
const response=require("../../network/response");
const controller=require("./controller.js");

router.get('/',(req,res)=>{
    const perfil=req.query.idPerfil || null;
    controller.getPerfiles(user).then((result)=>{
        response.success(req,res,result,200);
    })
});
router.post("/",(req,res)=>{
    const nombre=req.body;
    controller.addUser(perfil).then(()=>{
        response.success(req,res,"Perfil añadido correctamente");
    }).catch((error)=>{
        response.error(req,res,"error al añadir perfil");
    })
})
router.delete("/:id",(req,res)=>{
    controller.deletePerfil(req.params.id).then(()=>{
        response.success(req,res,`Perfil ${req.params.id} eliminado correctamente`);
    }).catch((e)=>{
        response.error(req,res,"Error al eliminar el perfil",500,e);
    })
})

module.exports=router;