const fs = require('fs');
const db = require('../../models')
const Admins = db.Admins;
const Op = db.Sequelize.Op;
const { sendMail } = require('../../helpers/nodemailer');
const { upload1 } = require('../../helpers/upload');
const { validateText} = require('../../helpers/bcrypt');
const { encode } = require('../../helpers/jwt');
const controller = {};

controller.getAll = async (req, res,) => {
    const dataAdmin = req.query.dataAdmin;
    const condition = dataAdmin ? { dataAdmin: { [Op.like]: `%${dataAdmin}%` } } : null;
        await Admins.findAll({
            where: condition
        })
        .then(results => {
            res.send(results)
        })
        
}

controller.register = async (req, res, next) => {
    const { name, email, password} = req.body;
        if (!password) {
            res.status(400).send({
                status: "400",
                message: 'Password is empty'
            });
        }

        const dataEmail = {
            from: 'Admin',
            to: email,
            subject: 'Register Successfully',
            text: `You have register successfully`,
            html: `<h1>You have register successfully</h1>
            <p>hi ${name}</p>
            <p>Your email is ${email}</p>
            <p>Your password is ${password}</p>
            `  
        }
        await Admins.findOne({
            where: {
                email: email
            }
        })
        .then(results => {
            if(results) throw {error: 'Email is already exist'} 
            else {
                const filePath = './files/' + req.filePath;
                return upload1(filePath)
                .then((url) => {
                   return Admins.create({
                        name: name,
                        email: email,
                        password: password,
                        role: 1,
                        profile: url
                    })
                    .then(() => {
                        res.status(201).send({
                            status: "201",
                            message: 'Register successfully',
                            sendMail: sendMail(dataEmail)
                        });
                    })
                })
                
            }
        })

    .catch (err => next(err));
}

controller.login = async (req, res, next) => {
    const { email, password } = req.body;
        await Admins.findOne({
            where: {
                email: email
            }
        })
        .then(results => {
            if(results){
                if(validateText(password, results.password)){
                    const token = encode({
                        id: results.id,
                        email: results.email,
                        role: results.role
                    });
                    return res.status(200).send({
                        message: 'Login successfully',
                        token: token,
                    });
                } else {throw {error: 'password is incorrect'}}
            } else {
                throw {error: 'Email is incorrect'}
            }
        })
    .catch (err => next(err));
}


module.exports = controller;