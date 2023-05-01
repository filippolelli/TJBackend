import jwt from 'jsonwebtoken'

export function generateJwt(user: any) {
    const expiry = new Date()
    expiry.setDate(expiry.getDate() + 7)

    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            exp: expiry.getTime() / 1000,
        },
        process.env.JWTSECRET
    )
}
