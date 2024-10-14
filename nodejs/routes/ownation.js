const express = require('express') 
const router = express.Router()

router.get('/',(req,res) => {

  res.render('ownation.html')
})


module.exports = router  