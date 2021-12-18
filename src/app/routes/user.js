const express, { Router } = require('express');

const router = Router();

module.exports = router;

router.post('/user', (req, res) =>{
    res.send('create user');
})