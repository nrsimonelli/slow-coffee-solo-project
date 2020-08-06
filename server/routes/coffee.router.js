const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
    console.log('this is the req.params.id of get:', req.params.id);
    const user_id = req.params.id;

    const queryString = 'SELECT name, roast_date FROM "coffee" WHERE coffee.user_id = $1;';
    // const queryString = 'SELECT * FROM "coffee";';
    console.log(queryString);
    // SELECT name, roast_date FROM "coffee" WHERE coffee.user_id = 2;
    pool.query(queryString, [user_id])
      .then((results) => res.send(results.rows))
      .catch(error => {
        console.log('error in coffee router get:', error);
        res.sendStatus(500);
    });

});




/**
 * POST route template
 */
router.post('/coffee', (req, res) => {  
    console.log(req.body);
    const name = req.body.name;
    const date = req.body.date;
    const user_id = req.body.user;
  
    const queryString = 'INSERT INTO "coffee" (name, roast_date, user_id) VALUES ($1, $2, $3);';
    pool.query(queryString, [name, date, user_id])
      .then(() => res.sendStatus(201))
      .catch(error => {
        console.log('error in coffee router post:', error);
        res.sendStatus(500);
    });

});


module.exports = router;