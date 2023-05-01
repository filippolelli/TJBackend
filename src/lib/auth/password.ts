import crypto from 'crypto'

export function generateSaltandHash(password) {
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
        .toString('hex')
    return {
        salt: salt,
        hash: hash,
    }
}

export function passwordValid(user: any, password: string) {
    const hash = crypto
        .pbkdf2Sync(password, user.salt, 1000, 64, 'sha512')
        .toString('hex')

    return user.hash === hash
}
