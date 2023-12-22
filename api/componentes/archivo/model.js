const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const mySchema=new Schema({
    id_perfil:{
        type:Schema.ObjectId,
        ref:'Perfiles'
    },
    fecha_crea:String,
    fecha_mod:String,
    timestamp:Number,
    titulo:{
        type:String,
        default:""
    },
    filename:String,
    nombre:String,
    tipo_archivo:Number,
    size:{
        type:Number,
        default:0
    },
    extension:String,
    codec:{
        type:String,
        default:""
    },
    duracion:{
        type:Number,
        default:0
    },
    ancho:{
        type:Number,
        default:0
    },
    alto:{
        type:Number,
        default:0
    },
    proporcion:{
        type:Number,
        default:1
    },
    resolucion:{
        type:Number,
        default:0
    },
    nsfw:{
        type:Boolean,
        default:false
    },
    hot:{
        type:Number,
        default:0
    },
    ia:{
        type:Boolean,
        default:false
    },
    tags: [{
        type: String,
        lowercase: true,
        trim: true
    }]
})

const model=mongoose.model('Archivos',mySchema);
module.exports=model;