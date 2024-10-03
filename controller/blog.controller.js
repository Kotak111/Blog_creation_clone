const BlogPost = require("../models/Blog.model");
const cloudinary = require("../utils/cloudinary")
const fs = require("fs")



//create blog
exports.createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    if (!title || !content || !author) {
      return res.status(400).json({
        success: false,
        message: "All fields (title, content, author) are required"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required"
      });
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'dcua1p9ku',
      timeout: 60000
    });
    const blogPost = new BlogPost({
      title,
      content,
      author,
      image: result.secure_url,
      cloudinary_id: result.public_id,
    });

    await blogPost.save();
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.log("Error deleting file:", err);
      } else {
        console.log("File deleted from server.");
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Blog successfully added',
    });

  } catch (error) {
    console.error('Error:', error.response || error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};


//find a Blog
exports.findBlog = async (req, res) => {
  try {
    const blog = await BlogPost.find();
    if (blog.length > 0) {
      res.json({
        success: true,
        blog: blog
      });
    } else {
      return res.json({
        success: false,
        message: "No Menu found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
//find Blog by Id
exports.singleBlogById = async (req, res) => {
  const blog = await BlogPost.findById(req.params.id)
  if (blog) {
    res.json({
      success: true,
      blog: blog
    })
  }
}

//delete a blog
exports.DeleteBlog = async (req, res) => {
  try {
    let find = await BlogPost.findById(req.params.id);
    if (!find) {
      res.json({
        success: true,
        message: "Menu is not find"
      })
    }
    await cloudinary.uploader.destroy(find.cloudinary_id);
    console.log(find.cloudinary_id);

    await find.deleteOne();
    res.json({
      success: true,
      message: "Blog is deleted"
    })
  } catch (error) {
    console.log(error);

  }
}
//update a blog

exports.UpdateBlog = async(req,res)=>{
  let blog = await BlogPost.findById(req.params.id);

    // Check if the blog is found
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    await cloudinary.uploader.destroy(blog.cloudinary_id);
    // Upload image to cloudinary
    let result;
    if (req.file) {
       result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'dcua1p9ku',
        timeout: 60000
      });
    }
    const data = {
      title: req.body.name ,
      content:req.body.content,
      author:req.body.author,
      image: result?.secure_url ,
      cloudinary_id: result?.public_id ,
    };
    blog = await BlogPost.findByIdAndUpdate(req.params.id, data, { new: true });
    res.status(200).json({
      success:true,
      message:"Blog Updated"
    });
}