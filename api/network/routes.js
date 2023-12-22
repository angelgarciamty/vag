const ejemplo=require("../componentes/ejemplo/network");
const perfil=require("../componentes/perfil/network");
const archivo=require("../componentes/archivo/network");
const config=require("../componentes/configuracion/network");
const coleccion=require("../componentes/coleccion/network");

const routes = (server)=>{
    server.use("/ejemplo",ejemplo);
    server.use("/perfiles",perfil);
    server.use("/archivos",archivo);
    server.use("/colecciones",coleccion);
    server.use("/config",config);
}

module.exports=routes;