import sequelize from '@sequelize-conn'
import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize'

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<string>
    declare name: string
    declare surname: string
    declare email: string
    declare hash: string
    declare nTravels: CreationOptional<number>
    declare visitedCities:CreationOptional<string[]>
    declare visitedNations:CreationOptional<string[]>

    declare salt: string
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}
User.init(
    {
        // Model attributes are defined here
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        nTravels: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        
        
        visitedCities: {
            type:DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
        },
        
        visitedNations: {
            type:DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
        },
        hash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        defaultScope: {
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        },
    }
)

export default User
