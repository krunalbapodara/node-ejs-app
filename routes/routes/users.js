
const express = require('express');
const userModal = require('../modals/users');
var router = express.Router();

router.get('/', (req, res) => {
    userModal.getAllUsers((err,data)=>{
        res.render('layout', { title: 'Users', route: "users", users : data })
    });
});

router.get('/:id', (req, res) => {
    userModal.getUserByToken(req.params.id,(err,data)=>{
        if(err) res.send(err);
        res.send(data);
    });
});

router.post('/', (req, res) => {
    userModal.addUser(req.body,(err,data)=>{
        if(err) res.send(err);
        res.send(data);
    });
});

router.put('/', (req, res) => {
    userModal.updateUser(req.body,(err,data)=>{
        if(err) res.send(err);
        res.send(data);
    });
});

router.delete('/', (req, res) => {
    userModal.deleteUserByToken(req.body.token,(err,data)=>{
        if(err) res.send(err);
        res.send(data);
    });
});

module.exports = router;