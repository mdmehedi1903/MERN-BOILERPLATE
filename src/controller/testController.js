const SendEmailUtility = require("../utility/sendEmailUtility")

exports.SendEmail = async (req,res)=> {
        try{
            await SendEmailUtility("mdmehedi1903@gmail.com", "This is Text", "This is Subject")
            res.json({status:"Success"})
        }catch(e){
            res.json({status:"Failed", msg: e})
        }
}