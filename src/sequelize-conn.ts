import {Sequelize} from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()
const sequelize = new Sequelize(process.env.DB_URL, {
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    logging: false,
})

console.log('Connected to database')

export default sequelize
