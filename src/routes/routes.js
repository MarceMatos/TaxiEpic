const router = require('express').Router();
const { exec } = require('child_process');


//Routes
router.get('/', (req,res) =>{
    res.render('index');
})

router.get('/Historicos', (req,res) =>{
    res.render('Historicos');
})
router.get('/max', (req,res) =>{
    res.render('max');
})

})
const connection = require('../../database/db.js');
module.exports = router;
