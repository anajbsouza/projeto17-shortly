import joi from "joi";

export const schemaUsers = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).required(),
    confirmPassword: joi.string().min(3).required().valid(joi.ref("password"))
});

export const schemaLogin = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(3).required()
});