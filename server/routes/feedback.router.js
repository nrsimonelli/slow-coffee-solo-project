const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    
});

/**
 * POST route template
 */
router.post('/send', (req, res) => {  
    console.log(req.body);
    const timing = req.body.timing;
    const temp = req.body.temp;
    const target = req.body.target;
    const taste = req.body.taste;
    const comment = req.body.comment;
    const user_id = req.body.user;
  
    const queryString = 'INSERT INTO "feedback" (timing, temp, target, taste, comment, user_id) VALUES ($1, $2, $3, $4, $5, $6)';
    pool.query(queryString, [timing, temp, target, taste, comment, user_id])
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(500));
  });

module.exports = router;