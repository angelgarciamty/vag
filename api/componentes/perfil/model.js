const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const mySchema=new Schema({
    fecha_crea:{
        type:String,
        default:""
    },
    fecha_mod:{
        type:String,
        default:""
    },
    nombre:{
        type:String,
        default:""
    },
    locacion:{
        type:String,
        default:""
    },
    fb:{
        type:String,
        default:""
    },
    ig:{
        type:String,
        default:""
    },
    tiktok:{
        type:String,
        default:""
    },
    info:{
        type:String,
        default:""
    },
    conocida:{
        type:Boolean,
        default:false
    },
    hot:{
        type:Number,
        default:0
    },
    pack:{
        type:Boolean,
        default:false
    },
    archivos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Archivos'
    }],
    cantidad_archivos:{
        type:Number,
        default:0
    },
    img_perfil:{
        type:Boolean,
        default:false
    },
    vistas:{
        type:Number,
        default:0
    }
})

const model=mongoose.model('Perfiles',mySchema);
module.exports=model;