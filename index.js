const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/blog')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
});


const Post = mongoose.model('Post', postSchema);

app.post('/posts', async (req, res) => {
    try {
        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
        });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(500).json({ error: 'Error creating the post', details: err.message });
    }
});


app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching posts', details: err.message });
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
