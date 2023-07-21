const Joi = require('joi');

const schema ={
    user:Joi.object({
        user_fname : Joi.string().required(),
        user_lname : Joi.string().required(),
        email:Joi.string().email().required(),
        address:Joi.string().required(),
        phone:Joi.string().required(),
        user_pasword:Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3-30}$"))
    })
}

module.export = schema;