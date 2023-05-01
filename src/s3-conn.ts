import AWS from 'aws-sdk'

import dotenv from 'dotenv'
dotenv.config()

const s3 = new AWS.S3({
    signatureVersion: 'v4',
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
})

console.log('Connected to object storage')
export default s3
