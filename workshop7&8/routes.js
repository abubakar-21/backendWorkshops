module.exports = function(app, db) {
    const express = require('express');
    const router = express.Router();

    // Read all artists
    router.get('/artists', (req, res) => {
        let sql = 'SELECT * FROM artists';
        db.query(sql, (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });

    // Read one artist by id
    router.get('/artists/:id', (req, res) => {
        let sql = `SELECT * FROM artists WHERE id = ${req.params.id}`;

        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });

    // Create a new artist
    router.post('/artists', (req, res) => {
        let newArtist = req.body;
        let sql = 'INSERT INTO artists SET ?';

        db.query(sql, newArtist, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });

    // Update an artist
    router.put('/artists/:id', (req, res) => {
        let updatedArtist = req.body;
        let sql = `UPDATE artists SET ? WHERE id = ${req.params.id}`;

        db.query(sql, updatedArtist, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });

    // Delete an artist
    router.delete('/artists/:id', (req, res) => {
        let sql = `DELETE FROM artists WHERE id = ${req.params.id}`;

        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });

    // Read all albums
    router.get('/albums', (req, res) => {
        let sql = 'SELECT * FROM albums';

        db.query(sql, (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });

    // Read one album by id
    router.get('/albums/:id', (req, res) => {
        let sql = `SELECT * FROM albums WHERE id = ${req.params.id}`;

        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });

    // Create a new album
    router.post('/albums', (req, res) => {
        let newAlbum = req.body;
        let sql = 'INSERT INTO albums SET ?';

        db.query(sql, newAlbum, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });

    // Update an album
    router.put('/albums/:id', (req, res) => {
        let updatedAlbum = req.body;
        let sql = `UPDATE albums SET ? WHERE id = ${req.params.id}`;

        db.query(sql, updatedAlbum, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });

    // Delete an album
    router.delete('/albums/:id', (req, res) => {
        let sql = `DELETE FROM albums WHERE id = ${req.params.id}`;

        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });

    app.use('/', router); // bind router to app here.
};
