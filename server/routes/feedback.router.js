const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// change id portion and also follow up on client side
router.get('/:id', rejectUnauthenticated, (req, res) => {
  console.log('this is the req.params.id of get:', req.params.id);
  const user_id = req.params.id;

  const queryString = 
    `SELECT id, timing, temp, target, taste, comment, date 
    FROM "feedback" 
    WHERE feedback.user_id = $1 
    ORDER BY date ASC;`;
  
  pool.query(queryString, [user_id])
    .then((results) => res.send(results.rows))
    .catch(error => {
      console.log('error in feedback router get:', error);
      res.sendStatus(500);
  });
});

router.delete('/delete/:id', rejectUnauthenticated, (req, res) => {
  console.log('feedback delete req.params:', req.params.id);
  const feedback_id = req.params.id;

  const queryString = 
    `DELETE FROM "feedback" WHERE id = $1`;
  
  console.log(queryString);
  
  pool.query(queryString, [feedback_id])
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(500));
});

router.put('/update/:id', rejectUnauthenticated, (req, res) => {
  console.log('in feedback router update!');
  console.log('req.body:', req.body);

  const timing = req.body.timing;
  const temp = req.body.temp;
  const target = req.body.target;
  const taste = req.body.taste;
  const comment = req.body.comment;
  const feedback_id = req.body.id;

  const queryString = 
    `UPDATE "feedback" SET timing = $1, temp = $2, target = $3, taste = $4, comment = $5 WHERE feedback.id = $6;`;
  
  console.log(queryString);
  
  pool.query(queryString, [timing, temp, target, taste, comment, feedback_id])
    .then(() => res.sendStatus(201))
    .catch(error => {
      console.log('error in upadate feedback router', error);
      res.sendStatus(500);
  });
});

router.post('/send', rejectUnauthenticated, (req, res) => {  
    console.log(req.body);
    const timing = req.body.timing;
    const temp = req.body.temp;
    const target = req.body.target;
    const taste = req.body.taste;
    const comment = req.body.comment;
    const user_id = req.body.user;
  
    const queryString = 
      `INSERT INTO "feedback" (timing, temp, target, taste, comment, user_id) 
      VALUES ($1, $2, $3, $4, $5, $6);`;

    pool.query(queryString, [timing, temp, target, taste, comment, user_id])
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(500));
  });

module.exports = router;