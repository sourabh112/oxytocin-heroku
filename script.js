const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex')
require('dotenv').config();
const PORT = process.env.PORT;

var menu_message = "Ok, you can use the following dictionary to create, edit amd share your shop\n 1 Add a product\n 2 Manage inventory\n \n Write 'menu' at any point to see all these options again."

const db = knex({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'postgres',
    port: '5432',
    password : 'Aabb11@@',
    database : 'shops_database'
  }
});

const webApp = express();

webApp.use(bodyParser.urlencoded({
    extended: true
}));
webApp.use(bodyParser.json());


webApp.get('/', (req, res) => {
    res.send('WhatsApp bot is running on this url.');
});

webApp.post('/whatsapp', async (req, res) => {
  const messaenger = require('./messenger.js');
  const shop_adder = require('./shop_module.js');
  const shop_name = require('./shop_name.js');
  const update_inventory = require('./update_inventory.js');
  const product_details = require('./product_details.js');
  const cache_memory = require('./cache_memory.js');
  var table_name = await shop_name.shop_name(req,res,db);
  var memory = await cache_memory.load_memory(req,res,db);
  if(memory!=undefined)var {id,name,product,inventory,menu,p_id} = memory;
  else{
    await cache_memory.add_memory(req,res,db);
    var {id,name,product,inventory,menu,p_id} = await cache_memory.load_memory(req,res,db);
  }
  if(name==1){
    await shop_adder.shop_adder(req,res,db);
    await shop_adder.shop_db_adder(req,db);
    await messaenger.messaenger_function(req,menu_message);
    await cache_memory.memory_update_menu(req,res,db,1);
    await cache_memory.memory_update_name(req,res,db,0);
  }
  else if(product>0){
    if(product==1){
      await product_details.product_details_id(req,res,db,table_name);
      await cache_memory.memory_update_p_id(req,res,db,req.body.Body);
      await messaenger.messaenger_function(req,"What is your product descreption?");
      await cache_memory.memory_update_product(req,res,db,2);
    }else if(product==2){
      await product_details.product_details_descreption(req,res,db,table_name,p_id);
      await messaenger.messaenger_function(req,"What is your product image?");
      await cache_memory.memory_update_product(req,res,db,3);
    }else if(product==3){
      await product_details.product_details_image(req,res,db,table_name,p_id);
      await messaenger.messaenger_function(req,"What is your product inventory?");
      await cache_memory.memory_update_product(req,res,db,4);
    }else if(product==4){
      await product_details.product_details_inventory(req,res,db,table_name,p_id);
      await cache_memory.memory_update_product(req,res,db,0);
      await messaenger.messaenger_function(req,"Product Added Sucessfully");
    }
  }
  else if(inventory>0){
    if(inventory==1){
      await messaenger.messaenger_function(req,"What is your new product inventory?");
      await cache_memory.memory_update_p_id(req,res,db,req.body.Body);
      await cache_memory.memory_update_inventory(req,res,db,2);
    }else if(inventory==2){
      await update_inventory.update_inventory(req,res,db,table_name,p_id);
      await cache_memory.memory_update_inventory(req,res,db,0);
    }
  }else if(menu==1){
    await cache_memory.memory_update_menu(req,res,db,0);
    if(req.body.Body=="1"){
      await messaenger.messaenger_function(req,"What is your product's unique identifier?");
      await cache_memory.memory_update_product(req,res,db,1);
    }else if(req.body.Body=="2"){
      await messaenger.messaenger_function(req,"What is your product's unique identifier?");
      await cache_memory.memory_update_inventory(req,res,db,1);
    }else{
      await messaenger.messaenger_function(req,"Please select a valid option.");
      await cache_memory.memory_update_menu(req,res,db,1);
    }
  }else if(req.body.Body=="Hi, I want to create a shop."){
    if(table_name!=undefined){
      await messaenger.messaenger_function(req,"Already have a registed shop at this number. Use 'menu' to edit it's inventory.");
    }else{
      await messaenger.messaenger_function(req,"What is your shop's name?");
      await cache_memory.memory_update_name(req,res,db,1);
    }
  }else if(req.body.Body=="menu"){
    if(table_name==undefined){
      await messaenger.messaenger_function(req,"You don't have a registed shop at this number. Use 'Hi, I want to create a shop.' to create a shop first.");
    }else{
      await messaenger.messaenger_function(req,menu_message);
      await cache_memory.memory_update_menu(req,res,db,1);
    }
  }else{
    await messaenger.messaenger_function(req,"Please reply with a any one of these valid commands:\n Hi, I want to create a shop.\nmenu");
  }
});

// Start the server
webApp.listen(PORT, () => {
    console.log(`Server is up and running at ${PORT}`);
});