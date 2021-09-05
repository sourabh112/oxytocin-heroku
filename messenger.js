const accountSid = 'ACa4be1d8b2a17cef97dc858dc53e14126'; 
const authToken = 'a8f306fbb46cd7c74c248eef0110e243'; 
const client = require('twilio')(accountSid, authToken); 

const messaenger_function = async(req,message)=> {
    client.messages 
        .create({ 
           body: message, 
           from: 'whatsapp:+14155238886',       
           to: req.body.From 
         }) 
        .then(message => console.log(message.sid)) 
        .done();
}

module.exports = {
    messaenger_function
}