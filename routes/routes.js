const express = require('express')
const Api = require('../controller/api')
const router = express.Router()
const multer = require('multer')

//multer middleWare:
let storage = multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'./uploads');
    },
    filename:function(req,file,cb,res){
        cb(null,file.fieldname+'-'+Date.now()+'-'+file.originalname);
    }
})


let upload = multer({
    storage:storage
}).single('image')



router.get('/movieList',Api.fetchAllPost)
router.get('/movieDetail/:id',Api.fetchPostByID)
router.post('/postmovie',upload,Api.CreatePost)
router.patch('/:id',upload,Api.UpdatePost)
router.delete('/:id',Api.DeletePost)

module.exports = router