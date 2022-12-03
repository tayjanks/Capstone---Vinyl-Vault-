require('dotenv').config();
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')
const path = require("path");

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
    homePage: (req, res) => {
        res.sendFile(path.join(__dirname, "../client/index.html"))
    },
    stylePage: (req, res) => {
        res.sendFile(path.join(__dirname, "../client/styles.css"))
    },
    homeJS: (req, res) => {
        res.sendFile(path.join(__dirname, "../client/main.js"))
    },

    getAllAlbums: (req, res) => {
        sequelize.query('select * from albums')
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err =>console.log(err))
    },


    submitAlbum: (req,res) => {
        const title = req.body.title
        const artist = req.body.artist
        const genre = req.body.genre
        const pressing = req.body.pressing
        const color = req.body.color

        sequelize.query(`
            insert into albums (title, artist, genre, pressing, color)
            values ('${title}','${artist}','${genre}',${pressing},'${color}')
            returning *;
            `)
            .then((dbRes) =>{res.status(200).send(dbRes[0])
        })
        .catch((err)=> {
            console.log(err)
        })
    },

    deleteAlbum: (req, res) => {
        const {id} = req.params
        sequelize.query(`delete from albums where album_id = ${id}`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
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
            values ('Im Wide Awake, Its Morning', 'Bright Eyes', 'Rock', 13, 'Black'),
            ('Cant Stop Wont Stop', 'The Maine', 'Rock', 12, 'Gold Marble'),
            ('Wish 30th Anniversary Remaster', 'The Cure', 'Rock', 61309, 'Black'),
            ('Live From Austin TX 89', 'Waylon Jennings', 'Country', 5681, 'Orange Blossom');
         `).then(() => {console.log ('DB seeded!')
        res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    }
}
