const express = require('express');
const router = express.Router();
const contactModel = require('../schema/contact.model');
const sendMail = require('../mailService');

router.post('/sendmessage', async(req,res)=>{
    const {name, email, subject, message} = req.body;
    try {
        //1. check all required fields
        if(!name || !email || !subject || !message){
            return res.status(400).json({
                success: false,
                message: 'All fields are required!'
            })
        }

        //2. save data to mongoDB
       const newContact = await contactModel.create({
            name,
            email,
            subject,
            message,

        });

        //3. send the mail
        const emailResult = await sendMail(name, email, subject, message);
        if(!emailResult.success){
            return res.status(500).json({
                success: false,
                message: 'Failed to send email, but message saved to DB',
                error: emailResult.error.message,
            })
        }
        //4. respond success
        res.status(200).json({
            success: true,
            message: 'Message saved and email sent successfully!',
           data: newContact
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "failed to save contact",
            error: error.message
        });
    }
})
module.exports = router;