

const db=require("mongoose");

db.Promise=global.Promise;

/*db.connect("mongodb://localhost:27017/prueba",{
    useNewUrlParser: true,
}).then(()=>{
    console.log("db conectada con exito");
}).catch((error)=>{
    console.log("error");
})*/

async function connect(url){
    await db.connect(url,{
        useNewUrlParser:true
    }).then(()=>{
        console.log("db conectada con exito");
    }).catch((error)=>{
        console.log("error");
    });
}

module.exports=connect;