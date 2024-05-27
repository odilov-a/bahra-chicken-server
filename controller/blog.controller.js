const Blog = require("../models/Blog.js");
const pagination = require("../utils/pagination.js");
const filterByLang = require("../utils/filterByLang.js");

exports.getAllBlog = async (req, res) => {
  try {
    const blogs = await pagination(Blog, req.query);
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
    const updateBlog = await Blog.findById(req.params.blogId);
    if (!updateBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    req.body.image = req.images;
    Object.assign(updateBlog, req.body);
    await updateBlog.save();
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
