const express = require('express') 
const router = express.Router()

router.get('/',(req,res) => {

  res.render('fundraiser.html')
})


module.exports = router  
