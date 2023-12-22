const db=require("./store.js");
const fecha=require("../../utils/fecha.js");

function getConfig(){
    return new Promise((resolve,reject)=>{
        resolve(db.getConfig());
    })
}

function addConfig(config){
    return new Promise((resolve, reject)=>{
        db.addConfig(config);
        resolve();
    })
}

function updateConfig(config){
    return new Promise(async (resolve,reject)=>{
        if(config == null){
            reject("Invalid data");
            return false;
        }
        const result=await db.updateConfig(config);
        resolve(result);
    })
}

module.exports={
    addConfig,
    getConfig,
    updateConfig,
}