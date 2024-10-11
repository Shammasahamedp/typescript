import express from 'express'
const adminController=require('../controllers/adminController')
const adminRouter=express.Router()
adminRouter.get('/',adminController.getDashboard)
adminRouter.get('/add',adminController.getUserAdd)
adminRouter.post('/add',adminController.postUser)
adminRouter.delete('/delete',adminController.deletUser)
adminRouter.get('/edit',adminController)
module.exports=adminRouter