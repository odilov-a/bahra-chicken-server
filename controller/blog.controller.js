const Blog = require("../models/Blog.js");
const pagination = require("../utils/pagination.js");
const filterByLang = require("../utils/filterByLang.js");

exports.getAllBlog = async (req, res) => {
  try {
    const blogs = await pagination(Blog, req.query);
    if(req.query.lang == 'en') {
      req.query.lang = 'eng';
    }
    const filtered = filterByLang(
      blogs.data,
      req.query.lang,
      "title",
      "description"
    );
    return res.json({
      data: filtered,
      pagination: blogs.pagination,
      _links: blogs._links,
      _meta: blogs._meta,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    blog.views += 1;
    await blog.save();
    return res.json({ data: blog });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    req.body.image = req.images;
    const newBlog = await Blog.create({ ...req.body });
    return res.json({ data: newBlog });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    if (req.images.length > 0) {
      req.body.image = req.images;
    } else {
      delete req.body.image;
    }
    const updateBlog = await Blog.findByIdAndUpdate(
      req.params.blogId,
      { ...req.body },
      { new: true }
    );
    if (!updateBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.json({ data: updateBlog });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.blogId);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
