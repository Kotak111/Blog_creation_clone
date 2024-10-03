const router=require("express").Router();
const blogController= require("../controller/blog.controller");
const { auth, IsUser } = require("../utils/auth");
const upload=require("../utils/image.add")
router.post("/addblog",auth,IsUser,upload.single('image'),blogController.createBlog)
router.get("/blogview",blogController.findBlog);
router.get("/:id",blogController.singleBlogById)
router.delete("/:id",auth,IsUser,blogController.DeleteBlog)
router.patch("/:id",auth,IsUser,upload.single('image'),blogController.UpdateBlog)
module.exports=router;