const query = require('../dbHelper')
const { generateOtp } = require('../services/otp')
const redis = require('../redis/index')
const client = require('../services/messaging')

module.exports.login = async (req, res, next) => {
    try {
        const { mobile } = req.body;
        //check if user exists
        const userData = await query.checkUserExists(mobile)
        if (!userData) {
            const err = new Error('Cannot fetch user details from database')
            return next(err)
        }
        let userId;
        if (userData.rows.length === 0) {
            //create user
            const newUserId = await query.createUser(mobile)
            userId = newUserId.rows[0].id
        }
        //create otp and store in redis
        const otp = await generateOtp()
        const expiryTime = Date.now() + 5 * 60 * 1000
        const redisKey = `${mobile}:${expiryTime}`
        await redis.set(redisKey, otp);
        //send otp to user
        await client.messages
            .create({
                body: `${otp} is your OTP to login to Myntra. DO NOT share with anyone. MYNTRA never calls to ask for OTP. The otp expires in 5 mins. 
                Please note that this message is just a part of our project to increase our technical skills. We do not intend to leak user information and harm your data privacy. It is just a demo project with the goal of implementing and showcasing our skills in an innovative way.
                `,
                to: `+91${mobile}`,
                from: process.env.TWILIO_PHONE,
            })
            .then((message) => console.log(message.sid));

        res.json({
            "message": `otp successfully sent to ${mobile}`,
        })

    }
    catch (err) {
        next(err);
    }
}

module.exports.otplogin = async (req, res, next) => {
    try {
        const { mobile, otp } = req.body;
        
    }
    catch (err) {
        next(err)
    }
}

module.exports.notFound = (req, res, next) => {
    const err = new Error(`Cannot ${req.method} ${req.path}`)
    err.statusCode = 404
    err.clientMessage = `Requested URL ${req.path} not found`
    next(err)
}