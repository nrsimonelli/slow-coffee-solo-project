const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', rejectUnauthenticated, (req, res) => {
    const user_id = req.params.id;

    const queryString = 'SELECT id, name, roast_date FROM "coffee" WHERE coffee.user_id = $1 ORDER BY roast_date ASC;';
    
    pool.query(queryString, [user_id])
      .then((results) => res.send(results.rows))
      .catch(error => {
        console.log('error in coffee router get:', error);
        res.sendStatus(500);
    });

});

router.delete('/delete/:id', rejectUnauthenticated, (req, res) => {
  console.log('in coffee router delete!', req.params.id);
  const coffee_id = req.params.id;

  const queryString = 
    `DELETE FROM "coffee" WHERE coffee.id = $1`;
  
  console.log(queryString);
  
  pool.query(queryString, [coffee_id])
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(500));
});

router.put('/update', rejectUnauthenticated, (req, res) => {
  console.log('in coffee router update!');
  console.log('req.body:', req.body);

  const coffee_id = req.body.id;
  const name = req.body.name;
  const date = req.body.date;

  const queryString = 
    `UPDATE "coffee" SET name = $1, roast_date = $2 WHERE coffee.id = $3;`;
  
  console.log(queryString);
  
  pool.query(queryString, [name, date, coffee_id])
    .then(() => res.sendStatus(201))
    .catch(error => {
      console.log('error in upadate coffee router', error);
      res.sendStatus(500);
  });
});

router.post('/add', rejectUnauthenticated, (req, res) => {  
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