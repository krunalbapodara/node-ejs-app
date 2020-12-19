const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('layout-full', { title: 'Sign In', route: "signin" })
})

router.get('/signin', (req, res) => {
    res.render('layout-full', { title: 'Sign In', route: "signin" })
})

router.get('/forgot', (req, res) => {
    res.render('layout-full', { title: 'Forgot Password', route: "forgot" })
})


module.exports = router;