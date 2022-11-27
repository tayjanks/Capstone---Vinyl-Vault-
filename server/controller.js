require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize (CONNECTION_STRING, {
    dialect:'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
  }
)

module.exports = {
    getCollection: (req, res) => {
        sequelize.query('select *from albums')
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err =>console.logg(err))
    },

    seed: (req, res) => {
        sequelize.query(`
        drop table if exists albums;

        create table albums (
            album_id serial primary key,
            title varchar,
            artist varchar,
            genre varchar,
            pressing integer,
            color varchar
        );

        insert into albums (title, artist, genre, pressing, color)
        values ('I'm Wide Awake, It's Morning', 'Bright Eyes', 'Rock', '13', 'Black'),
        ('Can't Stop, Won't Stop', 'The Maine', 'Rock', '12', 'Gold Marble'),
        ('Wish (30th Anniversary Remaster', 'The Cure', 'Rock', '61309', 'Black'),
        ('Live From Austin, TX 89', 'Waylon Jennings', 'Country', '5681', 'Orange Blossom'),
        `
        ).then(() => {console.log ('DB seeded!')
        res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    }
}