// This is half implemented don't try to run
const update_inventory = (req,res,db,table_name,id)=>{
    db.select('*').from(table_name)
    .where('id','=',id)
    .update({
    inventory: req.body.Body
    })
    .then(data=>{
        res.json(data);
        console.log(data);
    })
    .catch(error => res.status(404).json("incorrect"))
}
module.exports = {
    update_inventory
}