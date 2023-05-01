import {getCountryByCityName} from '@lib/geo-datas'
import sequelize from '@sequelize-conn'
import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey,
    NonAttribute,
    Op,
} from 'sequelize'
import Media from './Media'
import User from './User'

class Travel extends Model<
    InferAttributes<Travel>,
    InferCreationAttributes<Travel>
> {
    declare id: CreationOptional<string>
    declare cities: {name:string,country:string}[]
    declare start: Date
    declare owner: ForeignKey<string>
    declare end: Date
    declare media:NonAttribute<Media[]>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    getOwner(): NonAttribute<string> {
        return this.owner
    }
}

Travel.init(
    {
        // Model attributes are defined here
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        cities: {
            type: DataTypes.JSONB,
            allowNull: false,
        },
        
        start: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        end: {
            type: DataTypes.DATEONLY,
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
Travel.afterDestroy(updateUserStats)
Travel.afterCreate(updateUserStats)
Travel.afterUpdate(updateUserStats)

User.hasMany(Travel, {foreignKey: 'owner'})
Travel.belongsTo(User, {foreignKey: 'owner'})

Travel.hasMany(Media, {
    foreignKey: 'travelId',
    as: 'media',
})
Media.belongsTo(Travel, {foreignKey: 'travelId'})

User.hasMany(Media, {foreignKey: 'owner', onDelete: 'CASCADE'})
Media.belongsTo(User, {foreignKey: 'owner'})

export default Travel

async function updateUserStats(travel: Travel) {
    const travs = await Travel.findAll({
        where: {
            owner: travel.owner,
        },
        attributes: ['cities'],
    })
    
    let citiesVisitedByUser: Set<string> = new Set()
    let nationsVisitedByUser: Set<string> = new Set()
    
    travs.forEach((trav) => {
        trav.cities.forEach((couple) => {
            citiesVisitedByUser.add(couple.name)
            nationsVisitedByUser.add(couple.country)
        })
       
    })
    
    
    await User.update(
        {
            nTravels: travs.length,
            visitedCities: [...citiesVisitedByUser].sort(),
            visitedNations: [...nationsVisitedByUser].sort(),
        },
        {
            where: {
                id: travel.owner,
            },
        }
    )
}



