"use strict";
const express_server = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cron = require('node-cron');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {v4: uuidv4} = require('uuid');
const nodemailer = require('nodemailer');
const user = require('./models/user_model');
const auth_token = require('./models/one_time_token');
const dotenv = require('dotenv');
const app = express_server();


dotenv.config();

app.use(cors());    
app.use(express_server.json());

mongoose.connect('mongodb://localhost:27017/user-auth-db');

app.post('/api/signup', async (req, res) => {
    
    const { username, email, password, captcha_token } = req.body;
    const recaptcha_url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha_token}`

    try{
        const response = await axios.post(recaptcha_url);
        const { success } = response.data;

        if (success){
            const hashed_pwd = await bcrypt.hash(password, 10);

            await user.create({
                username: username,
                email: email,
                password: hashed_pwd,
            })
            res.json({status:'ok', message:'User registration successful', data:response.data})
        } else{
            res.json({status: 'error', error: 'Expired or invalid recaptcha token'});
        }
        
    } catch (err){
        res.json({status: 'error', error: 'Check database connection ' + err.message});
    };
});

app.post('/api/signin', async (req, res) => {
    const user_data = await user.findOne({
        email: req.body.email,
    })

    if (!user_data){
        return res.json({status:'error', message: 'No user found!'});
    };

    const is_password_ok = await bcrypt.compare(req.body.password, user_data.password);

    if(is_password_ok){
        generate_token(req.body.email, user_data.username);
        const token = jwt.sign({
            username:user_data.username,
            email: user_data.email,

        }, 'sseeccuurreekkeeyy123');
        return res.json({status:'ok', user:token});
    } else{
        return res.json({status: 'error', user: false, message:"incorrect credentials"});
    }
});

app.get('/api/quote', async (req, res) => {
    const token = req.headers['x-access-token'];

    try{
        const decoded_token = jwt.verify(token, 'sseeccuurreekkeeyy123');
        const email = decoded_token.email;
        const user_data = await user.findOne({email:email});

        return res.json({status:'ok', quote: user_data.quote});
    } catch (error){
        res.json({status:'error', error: 'bad token'})
    };
});

app.post('/api/quote', async (req, res) => {
    const token = req.headers['x-access-token'];

    try{
        const decoded_token = jwt.verify(token, 'sseeccuurreekkeeyy123');
        const email = decoded_token.email;
        await user.updateOne(
            {email:email},
            {$set:{quote: req.body.quote}}
            )

        return res.json({status:'ok'});
    } 
    catch(e){
        res.json({status:'error', error: 'bad token'})
    }
});

app.post('/api/verify_token', async (req, res) => {
    
    console.log('verify: ', req.body);

    const { email, token } = req.body;
    try{
        const valid_token = await auth_token.findOne({email:email, unique_token: token});

        console.log(valid_token);
        
        if (valid_token === null){
            return res.json({status:'error', message:'token is invalid or has expired'});
        }

        if (valid_token.expires_at < new Date()){
            // Token has expired, must be deleted asap
            await auth_token.deleteOne({_id: valid_token._id});
            return res.json({status:'error', message:'token is invalid or has expired'});
        }

        await auth_token.deleteOne({_id: valid_token._id});

        return res.json({status:'ok', message:'Verification successful '})
        } 
    catch(error) {
        
    }
    
});

async function generate_token(email, username) {
    const unique_token = uuidv4();
    const expires_at = new Date(Date.now() + 1800000); // Token expires in 30mins
    try{

        auth_token.create({ email, unique_token, expires_at });

    
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure:true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_APP_PASSWORD
            }
          });
        let message = {
            from: process.env.EMAIL,
            to: email,
            subject: "One Time Token",
            html: `<div>
                <p>Dear ${username},</p>
                <p>Kindly use the one time token below to complete the login into your account, this token will expire on <em>${expires_at}</em>.</p>
                <p>Do not share this token with anyone!</>
                <p>Token: <em>${unique_token}</em></>
                <br/><br/><br/><br/>
                <h5><em>This is an auto generated message, do not reply</em></h5>
                    </div>`,
          }
        
          // send mail with defined transport object
        //   await transporter.sendMail(message, (err, info) => {
        //     if(err){
        //         console.log("Email could not be sent: " + err.message);
        //         return process.exit(1);
        //     }
        //   });
        

    } catch (error){
        console.log(error.message)
    }
    
  }

// cron job to delete expired tokens on a daily basis 
cron.schedule('0 0 * * *', async () => {
  try {
    const expired_tokens = await auth_token.find({ expires_at: { $lt: new Date() } });
    await auth_token.deleteMany({ _id: { $in: expires_at.map(record => record._id) } });
    console.log(`Removed ${expired_tokens.length} expired token records`);
  } catch (err) {
    console.error('Error removing expired token records:', err);
  }
});



app.listen (5000, () => {
    console.log('Running on port 5000')
});