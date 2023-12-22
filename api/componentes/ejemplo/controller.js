const db=require("./store.js");

function promise(){
    console.log("comenzamos");
    return new Promise((resolve, reject) => {
        const timeout=10000;
        setTimeout(() => {
            resolve();
        }, timeout);
    })
};

function promise2(){
    return new Promise((resolve)=>{
        const timeout=2000;
        setTimeout(()=>{
            resolve();
        },timeout);
    })
}
function addUser(nombre){
    const date=new Date();
    return new Promise((resolve, reject)=>{
        db.addUser(nombre, date);
        resolve();
    })
}
function getUsers(filterUser){
    return new Promise((resolve,reject)=>{
        resolve(db.getUsers(filterUser));
    })
}
function updateUser(id,nombre){
    return new Promise(async (resolve,reject)=>{
        if(!id || !nombre){
            reject("Invalid data");
            return false;
        }
        const result=await db.updateUser(id,nombre);
        resolve(result);
    })
}
function deleteUser(id){
    return new Promise((resolve,reject)=>{
        if(!id){
            reject("Id invalido");
            return false;
        }
        db.deleteUser(id).then(()=>{
            resolve();
        }).catch(e=>{
            reject(e);
        });
    });
}

module.exports={
    promise,
    promise2,
    addUser,
    getUsers,
    updateUser,
    deleteUser
}