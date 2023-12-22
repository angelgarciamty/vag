const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const mySchema=new Schema({
    diseño:Number,
    orden:Number,
    ancho_miniatura:Number,
    alto_miniatura:Number,
    opacidad:Number,
    tipografia:Number,
    habilitar_PIN:Boolean,
    PIN:Number,
    ruta_archivos:String,
    duracion_gif:{
        type:Number,
        Default:6
    }
})

const model=mongoose.model('Configuraciones',mySchema);
module.exports=model;