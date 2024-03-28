const { Router, response } = require("express")
const usersRoutes = Router()
const UsersController = require("../controllers/UsersController")
const usersController = new UsersController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const multer = require("multer")
const uploadConfig = require("../configs/upload")
const upload = multer(uploadConfig.MULTER)

usersRoutes.post("/", usersController.create )
usersRoutes.put("/", ensureAuthenticated, usersController.update)
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"),(request, response) => {
  console.log(request.file.filename)
  response.json()
})

module.exports = usersRoutes