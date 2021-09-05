const load_memory = async (req,res,db)=>{
    var memory;
    await db.select('*').from('cache_memory')
    .where('id','=',req.body.From)
    .then(data=>{
        memory = data[0];
    })
    .catch(error => res.status(404).json("incorrect"));
    return memory;
}

const add_memory = async (req,res,db)=>{
    await db('cache_memory')
    .insert({
        id:req.body.From,
        name:0,
        product:0,
        inventory:0,
        menu:0,
        p_id:""
    })
    .then(data=>{
        // res.json(data[0]);
    })
}


const memory_update_name = async (req,res,db,data)=>{
    db.select('*').from('cache_memory')
    .where('id','=',req.body.From)
    .update({
        name: data
    })
    .then(data=>{
        // res.json(data);
    })
    .catch(error => res.status(404).json("incorrect"))
}

const memory_update_product = async (req,res,db,data)=>{
    db.select('*').from('cache_memory')
    .where('id','=',req.body.From)
    .update({
        product: data
    })
    .then(data=>{
        // res.json(data);
    })
    .catch(error => res.status(404).json("incorrect"))
}

const memory_update_inventory = async (req,res,db,data)=>{
    db.select('*').from('cache_memory')
    .where('id','=',req.body.From)
    .update({
        inventory: data
    })
    .then(data=>{
        // res.json(data);
    })
    .catch(error => res.status(404).json("incorrect"))
}

const memory_update_menu = async (req,res,db,data)=>{
    db.select('*').from('cache_memory')
    .where('id','=',req.body.From)
    .update({
        menu: data
    })
    .then(data=>{
        // res.json(data);
    })
    .catch(error => res.status(404).json("incorrect"))
}

const memory_update_p_id = async (req,res,db,data)=>{
    db.select('*').from('cache_memory')
    .where('id','=',req.body.From)
    .update({
        p_id: data
    })
    .then(data=>{
        // res.json(data);
    })
    .catch(error => res.status(404).json("incorrect"))
}

module.exports = {
    load_memory,
    add_memory,
    memory_update_name,
    memory_update_product,
    memory_update_inventory,
    memory_update_menu,
    memory_update_p_id
}