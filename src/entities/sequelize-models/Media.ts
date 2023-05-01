import sequelize from '@sequelize-conn'
import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey,
    NonAttribute,
} from 'sequelize'

class Media extends Model<
    InferAttributes<Media>,
    InferCreationAttributes<Media>
> {
    declare id: CreationOptional<string>
    declare travelId: ForeignKey<string>
    declare bucket: string
    declare key: string
    declare thumbnailKey: string
    declare owner: ForeignKey<string>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    getOwner(): NonAttribute<string> {
        return this.owner
    }
    getThumbnailKey(): NonAttribute<string> {
        return this.thumbnailKey
    }
    getKey(): NonAttribute<string> {
        return this.key
    }
    getId(): NonAttribute<string> {
        return this.id
    }
}

Media.init(
    {
        // Model attributes are defined here
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        key: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        bucket: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        thumbnailKey: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        defaultScope: {
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'bucket', 'travelId',],
            },
        },
    }
)



export default Media
