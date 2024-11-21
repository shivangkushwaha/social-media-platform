require("dotenv").config();
const Cryptr = require("cryptr");
const Secret_Key = process.env.SECRET_KEY;
const cryptr = new Cryptr(Secret_Key);
const Jwt = require("jsonwebtoken");
const privateKey = process.env.TOKEN_SECRET;
const sgMail = require("@sendgrid/mail");
const emailApiKey = process.env.EMAIL_ACCUNT_API_KEY
const Models = require("./models");
const appConstant = require("../appConstant.js");
const axios = require("axios");
const attachmentAttribute = require("./attributes/attachment.js").includeAttachmentAttributes;
module.exports = {
  // Decrypt Data
  decryptData:async(text)=>{
    return cryptr.decrypt(text)
  },

  sendEmail: async(email, subject, body )=>{
    sgMail.setApiKey(emailApiKey);
    console.log("Sending Email ..............................")
    const msg = {
      to: email,
      from: process.env.ADMIN_EMAIL, 
      subject: subject,
      html: body
    };
    let result=await sgMail.send(msg);
    console.log("result",result)
  },
  sendOTP: async(countryCode, phone, otp )=>{
    try{
      if(process.env.NODE_ENV ==='production') {
        let url = process.env.sendOtpUrl;
        console.log('process.env.OTP_API_KEY',process.env.OTP_API_KEY)
        let res = await axios.post(`${url}`, {
          headers: {
          "authorization":`${process.env.OTP_API_KEY}`,
          "Content-Type":"application/json"
          },
          variables_values : otp,
          route :'otp',
          numbers : phone.toString()
        })
        return res.data.return ?  res.data.return : false;
      }
      return true;
    } catch(err) {
      console.error(`Error on Sendiing OTP`, err.toString());
      return false
    }
  },

  encryptData:async(text)=>{
    let data=await cryptr.encrypt(text)
    return data
  },

  // Generate JWT Tokens
  generateAccessToken: async (id) => {
    let hasFullAccess = 0;
    let scope = [];
    let user = await Models.User.findOne({
      where: { id },
      attributes: ["uuid","id","email","countryCode","email","phone"],
      include: [
        {
          model: Models.UserProfile,
          attributes: ["name", "dob", "isCompleted","image"],
          as: "profile",
          include: [
            {
              model: Models.Attachment,
              attributes: attachmentAttribute
            }
          ]
        },
      ],
    });    
    let roles = await user.getRoles();
    for (const role of roles) {
      scope.push(role.dataValues.code);
      let permissions = await role.getPermissions({ raw: true, nest: true });
      for (const permission of permissions) {
        scope.push(permission.code);
      }
    }
    if (scope.includes("admin")) {
      hasFullAccess = 1;
    }
    // console.log('user', user)
    let token = signToken(JSON.stringify({id:user.dataValues.id,scope}));
    user = JSON.parse(JSON.stringify(user));
    user.profile.image = !!user.profile.image ? process.env.ATTACHMENT_URL + user.profile.Attachment.path : null;
    if(user.profile) {
      delete user.profile.Attachment
    }
    return {
      hasFullAccess,
      user,
      scope,
      token,
    };
  },

  // Validate Token
  validateToken: async (token) => {
    try {
      let data = JSON.parse(Jwt.verify(token, privateKey).data);
      data=JSON.parse(data)
      return data;
    } catch (error) {
      return false;
    }
  },

   getOffset:(page,limit)=>{
    return ((page - 1) * limit)
  },

   totalPages:(count,limit)=>{
  return (Math.ceil(count / limit))
  },

   generateOTP:( digit = appConstant.OTP_LENGTH_DIGITS ) =>{
    /* Send Master OTP if eve is not production */
    if(process.env.NODE_ENV === appConstant.PRODUCTION_ENV) { 
      const digits = appConstant.OTP_USED_DIGITS;
      let otp = "";
      for (let i = 0; i < digit; i++) {
        const randomIndex = Math.floor(Math.random() * 10);
        otp += digits[randomIndex];
      }
      return otp;
    } else {
      return appConstant.MASTER_OTP
    }
  },

  genetareKey : (inputString) =>{
    try {
      const cleanedString = inputString.replace(/[^\w\s]/gi, '').toLowerCase().replace(/\s+/g, '-');
      return cleanedString;
    } catch (error){
      console.error(`Error in genetareKey function :`, error);
      throw new Error(error);
    }
  }
};

// Signing Information With Private Key
const signToken = (data) => {
  return Jwt.sign( {data: JSON.stringify(data) }, privateKey);
};

