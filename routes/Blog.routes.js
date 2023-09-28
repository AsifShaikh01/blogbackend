const express = require("express");
const {BlogModel} = require("../model/Blog.model");
const blogRouter = express.Router();

blogRouter.get("/blogs" , async(req,res)=>{
    const {category , title , sort} = req.query;
    const query = {};

    if(category){
        query.category = category;
    }
    if(title){
        query.title = new RegExp(title, "i");
    }

    let sortOptions = {};
    if(sort){
        const[field , order] = sort.split(":");
        sortOptions[field] = order === "asc" ? 1 : -1;
    }
    try {
        const blogs = await BlogModel.find(query)
        .sort(sortOptions)
        res.send(blogs);

    } catch (error) {
        res.send(error)
    }
})

blogRouter.post("/blogs",async(req,res)=>{
    const payload = req.body;
    try {
        const blog = new BlogModel(payload);
        await blog.save();
        res.send("Blog is added!!")
    } catch (error) {
        
    }
})

blogRouter.patch("/blogs/:id",async(req,res)=>{
    const ID = req.params.id;
    const payload = req.body;
    try {
        await BlogModel.findByIdAndUpdate({_id:ID},payload);
        res.send("blog is updated!!")
        
    } catch (error) {
        res.send(error)
    }
})

blogRouter.delete("/blogs/:id",async(req,res)=>{
    const ID = req.params.id;
    
    try {
        await BlogModel.findByIdAndDelete({_id:ID},payload);
        res.send("blog is deleted!!")
        
    } catch (error) {
        res.send(error)
    }
})

module.exports={
    blogRouter
}