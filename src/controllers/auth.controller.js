import bcrypt from 'bcryptjs/dist/bcrypt.js';
import User from '../models/user.model.js';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';


export const register = async (req, res) => {
    const { email, password, username } = req.body;
    try {


        const userFound = await User.findOne({email});
        if (userFound) 
        return res.status(400).json(["The email already exists"])


        const passwordHashs = await bcrypt.hash(password, 10) 

        const newUser = new User({
            email, password: passwordHashs, username
        })
        const userSaved = await newUser.save();

       const token = await createAccessToken({id:userSaved._id})
       

        res.cookie('token', token);
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createAt: userSaved.createdAt,
            updateAt: userSaved.updateAt,
        })
    } catch (error) {
       res.status(500).json({message: error.message})
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {

        const userFound = await User.findOne({email});

        if (!userFound) return res.status(400).json({message: 'User not found'});

        const isMatch = await bcrypt.compare(password, userFound.password) 

        if(!isMatch) return res.status(400).json({message:"Incorrect password"});

       const token = await createAccessToken({id:userFound._id})
       

        res.cookie('token', token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createAt: userFound.createdAt,
            updateAt: userFound.updateAt,
        })
    } catch (error) {
       res.status(500).json({message: error.message})
    }
};

export const logout = (req, res) => {
    res.cookie('token', "",{
        expires: new Date(0)
    } )
    return res.sendStatus(200);
}

export const profile =async (req, res) => {
    const userFound = await User.findById(req.user.id);
    if (!userFound) return res.status(400).json({message:"User not sound"});
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createAt: userFound.createdAt,
        updateAt: userFound.updateAt,
    });
}

export const verifyToken = async (req, res) => {
    const {token} =  req.cookies
    if (!token) return res.status(401).json({message:"Unauthrized"})
    jwt.verify(token,TOKEN_SECRET, async (err, user)=>{
        if (err) return res.status(401).json({message: "Unathorized"})
        const userFound =  await User.findById(user.id)
        if (!userFound) return res.status(401).json({
            message: " No autorizado "
        });
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        })
    })


}
