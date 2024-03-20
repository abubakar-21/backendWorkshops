const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'MusicStore',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

const schema = buildSchema(`
  type Artist {
    id: Int
    name: String
  }
  
  type Album {
    id: Int
    title: String
    releaseYear: Int
    artistId: Int
  }
  
  type Query {
    artists: [Artist]
    artist(id: Int): Artist
    albums: [Album]
    album(id: Int): Album
  }
  
  type Mutation {
    createArtist(name: String): Artist
    updateArtist(id: Int, name: String): Artist
    deleteArtist(id: Int): Artist
    createAlbum(title: String, releaseYear: Int, artistId: Int): Album
    updateAlbum(id: Int, title: String, releaseYear: Int, artistId: Int): Album
    deleteAlbum(id: Int): Album
  }
`);

const root = {
  artists: () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM artists';
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },
  artist: (args) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM artists WHERE id = ${args.id}`;
      db.query(sql, (err, result) => {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  },
  albums: () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM albums';
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },
  album: (args) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM albums WHERE id = ${args.id}`;
      db.query(sql, (err, result) => {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  },
  createArtist: (args) => {
    const { name } = args;
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO artists SET ?';
      db.query(sql, { name }, (err, result) => {
        if (err) reject(err);
        resolve({ id: result.insertId, name });
      });
    });
  },
  updateArtist: (args) => {
    const { id, name } = args;
    return new Promise((resolve, reject) => {
      const sql = `UPDATE artists SET ? WHERE id = ${id}`;
      db.query(sql, { name }, (err, result) => {
        if (err) reject(err);
        resolve({ id, name });
      });
    });
  },
  deleteArtist: (args) => {
    const { id } = args;
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM artists WHERE id = ${id}`;
      db.query(sql, (err, result) => {
        if (err) reject(err);
        resolve({ id });
      });
    });
  },
  createAlbum: (args) => {
    const { title, releaseYear, artistId } = args;
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO albums SET ?';
      db.query(sql, { title, releaseYear, artistId }, (err, result) => {
        if (err) reject(err);
        resolve({ id: result.insertId, title, releaseYear, artistId });
      });
    });
  },
  updateAlbum: (args) => {
    const { id, title, releaseYear, artistId } = args;
    return new Promise((resolve, reject) => {
      const sql = `UPDATE albums SET ? WHERE id = ${id}`;
      db.query(sql, { title, releaseYear, artistId }, (err, result) => {
        if (err) reject(err);
        resolve({ id, title, releaseYear, artistId });
      });
    });
  },
  deleteAlbum: (args) => {
    const { id } = args;
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM albums WHERE id = ${id}`;
      db.query(sql, (err, result) => {
        if (err) reject(err);
        resolve({ id });
      });
    });
  },
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(7000, () => {
  console.log('Server started on port 7000');
});
