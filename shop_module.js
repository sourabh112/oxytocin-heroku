const shop_adder = async (req,res,db)=>{
    db('shops')
    .insert({
        id:req.body.From,
        name:req.body.Body
    })
    .then(data=>{
        res.json(data[0]);
    })
}

const shop_db_adder = async(req,db)=>{
    db.schema.withSchema('public').createTable( req.body.From , function (table) {
    table.text('id');
    table.text('descreption');
    table.text('image');
    table.text('inventory');
    })
    .catch(err => console.log(err))
}

module.exports = {
    shop_adder,
    shop_db_adder
}