import User from "../database/models/User.js"
import { hashPassword, comparepassword } from "../middleware/functions.js";


export const register = async (req, res) => {
    try {
        const { name, email, password, cpassword } = req.body;

        const user = await User.findOne({ email: email, })
        if (user) {
            return res.status(400).send({ msg: "You are already registered pls signup.", user })
        }
        if (password != cpassword) {
            return res.status(400).send({ msg: "Password and confirm password do not match" })
        }
        const hash = await hashPassword(password);
        const addUser = new User({ email, password: hash, name })
        const addeduser = await addUser.save()
        return res.status(200).send({ msg: "User has been added sucessfully", addeduser })

    } catch (error) {
        res.status(500).send({ error })
    }
}



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).send({ msg: "User does not exsists signup first" })
        }
        const compare = await comparepassword(password, user.password)
        if (!compare) {
            return res.status(400).send({ msg: "Password entered is wrong." })
        }

        return res.status(200).send({ msg: "You are logged in.", user })
    } catch (error) {
        res.status(500).send({ error })
    }
}







