const Model=require("./model");

async function getConfig(){
    return await Model.find();
}

function addConfig(config){
    const modelU=new Model(config);
    return modelU.save().then(()=>{
        console.log("la config se guardo correctamente");
    }).catch(()=>{

    });
}
async function updateConfig(config){
    const foundConfig= await Model.findOne({
        _id:config._id
    });
    Object.assign(foundConfig,config);
    const ConfigModified= await foundConfig.save();
    return ConfigModified;
}

module.exports={
    addConfig,
    getConfig,
    updateConfig
}