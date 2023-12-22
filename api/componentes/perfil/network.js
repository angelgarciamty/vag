const express = require('express');
const router = express();
router.use(express.json());
router.use(express.urlencoded());
const response=require("../../network/response");
const controller=require("./controller.js");
const fs=require("fs");
const multer = require('multer');
const sharp = require('sharp');
const configurationMulter=require("./utils/configurationMulter");
const { storage, fileFilter } = configurationMulter;
const upload = multer({ storage: storage }); // Carpeta donde se guardarán las imágenes recibidas

router.get('/',(req,res)=>{
    if(req.query.id){
        controller.getPerfil(req.query.id).then((result)=>{
            response.success(req,res,result,200,result.length);
        }).catch(()=>{
            response.error(req, res, "error al mostrar el perfil");
        })
    }else{
        const filtros=controller.getFiltros(req);
        controller.getPerfiles(filtros).then((result)=>{
            response.success(req,res,result,200,result.length);
        }).catch(()=>{
            response.error(req, res, "error al mostras los perfiles");
        })
    }
});
router.get('/cantidadPerfiles',(req,res)=>{
    controller.getCantidadPerfiles().then((result)=>{
        response.success(req,res,{perfiles:result},200);
    })
});
router.get('/locaciones',(req,res)=>{
    controller.getLocaciones().then((result)=>{
        response.success(req,res,result,200);
    })
});
router.post("/",(req,res)=>{
    const perfil=req.body;
    controller.addPerfil(perfil).then((result)=>{
        response.success(req,res,result,200);
    }).catch((error)=>{
        response.error(req,res,error);
    })
})
router.put("/",(req,res)=>{
    const perfil=req.body;
    controller.updatePerfil(perfil).then(()=>{
        response.success(req,res, perfil,200);
    }).catch((error)=>{
        response.error(req,res,"error al modificar el perfil");
    })
})
router.patch('/', upload.single('imgPerfil'), (req, res) => {
    const perfil={img_perfil:false};
    if (!req.file) {
        return res.status(400).json({ error: 'No se ha cargado ningún archivo.' });
      }
    const id=req.body.id_perfil;
    controller.getPerfil(id).then((result)=>{
        const nombrePerfil=result.nombre;
        sharp(req.file.path)
        .resize(100, 100)
        .toFile(process.env.FILEPATH+"/"+nombrePerfil+"/img-perfil-"+nombrePerfil+".png", (err, info) => {
            if (err) {
                return res.status(500).json({ error: 'No se pudo redimensionar la imagen.' });
            }
            const perfil={img_perfil:true,_id:req.body.id_perfil};
            controller.updatePerfil(perfil).then(()=>{
                console.log("se modifico la imagen de perfil correctamente");
                response.success(req,res, perfil,200);
            }).catch((error)=>{
                response.error(req,res,"error al subir imagen de perfil");
            })
            fs.unlinkSync(req.file.path);
        });
    })
});
router.delete("/:id",(req,res)=>{
    controller.deletePerfil(req.params.id).then(()=>{
        response.success(req,res,`Perfil ${req.params.id} eliminado correctamente`);
    }).catch((e)=>{
        response.error(req,res,"Error al eliminar el perfil",500);
    })
})

module.exports=router;