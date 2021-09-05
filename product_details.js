const product_details_id = async (req,res,db,table_name)=>{
    db(table_name)
    .insert({
        id:req.body.Body,
        descreption:" ",
        image:" ",
        inventory:" "
    })
    .then(data=>{
        res.json(data[0]);
    }).catch(error => console.log(error));
}

const product_details_descreption = async (req,res,db,table_name,id)=>{
    db.select('*').from(table_name)
    .where('id','=',id)
    .update({
        descreption: req.body.Body
    })
    .then(data=>{
        res.json(data);
        console.log(data);
    })
    .catch(error => res.status(404).json("incorrect"))
}

const product_details_image = async (req,res,db,table_name,id)=>{
    db.select('*').from(table_name)
    .where('id','=',id)
    .update({
        image: req.body.MediaUrl0
    })
    .then(data=>{
        res.json(data);
        console.log(data);
    })
    .catch(error => res.status(404).json("incorrect"))
}

const product_details_inventory = async (req,res,db,table_name,id)=>{
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
    product_details_id,
    product_details_descreption,
    product_details_image,
    product_details_inventory
}