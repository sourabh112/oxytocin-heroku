// This is half implemented don't try to run
const shop_name = async (req,res,db)=>{
    var target_name;
    await db.select('*').from('shops')
    .where('id','=',req.body.From)
    .then(data=>{
        target_name = data[0].id;
    })
    .catch(error => res.status(404).json("incorrect"));

    return target_name;
}
module.exports = {
    shop_name
}