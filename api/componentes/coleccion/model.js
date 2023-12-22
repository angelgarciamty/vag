const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const mySchema=new Schema({
    nombre:String,
    descripcion:{
        type:String,
        default:""
    },
    archivos: [
    {
        id_archivo:{
            type:Schema.ObjectId,
            ref:'Archivos'
        },
    }],
    count_archivos:Number,
    fecha_crea:String,
    fecha_mod:String
})

const model=mongoose.model('Colecciones',mySchema);
module.exports=model;