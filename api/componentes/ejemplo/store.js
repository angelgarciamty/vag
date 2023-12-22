const Model=require("./model");

function addUser(nombre,date){
    const modelU=new Model({
        user:nombre,
        date:date
    });
    return modelU.save().then(()=>{
        console.log("el usuario se guardo correctamente");
    }).catch(()=>{

    });
}
async function getUsers(filterUser){
    let filter={};
    if(filterUser!== null){
        filter={user:filterUser};
    }
    return await Model.find(filter);
}
async function updateUser(id,nombre){

    // tambien se puede usar findById(id) 
    const foundUser= await Model.findOne({
        _id:id
    });
    foundUser.user=nombre;
    const UserModified= await foundUser.save();
    return UserModified;
}
function deleteUser(id){
    return Model.deleteOne({
        _id:id
    })
}

module.exports={
    addUser,
    getUsers,
    updateUser,
    deleteUser
}