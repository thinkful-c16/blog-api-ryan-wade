'use strict';

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

//dummy data blog posts
BlogPosts.create('How to Code 102', 'Wade', 'This book teaches intermediate coding');
BlogPosts.create('How to Code 101', 'Ryan', 'This book teaches coding basics');

router.get('/', (req, res) => {
    res.json(BlogPosts.get());
});


router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['title', 'author', 'content'];
    for(let i=0; i<requiredFields.length; i++){
        const field = requiredFields[i];
        if(!(field in req.body)) {
            const message = `Missing ${field} in request`;
            console.error(message);
            return res.status(400).send(message);
        }
    }
    const post = BlogPosts.create(req.body.title, req.body.content, req.body.author);
    res.status(201).json(post);
});


router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Deleted blogPost ${req.params.id}`);
    res.status(204).end();
});


router.put('/:id', jsonParser, (req, res) => {

    const requiredFields = ['title', 'author', 'content', 'id'];

    for(let i = 0; i<requiredFields.length; i++){
        const field = requiredFields[i];
        if(!(field in req.body)){
            const message = `Missing ${field} in request`;
            console.error(message);
            return res.status(400).send(message);
        }
    }

    if(req.params.id !== req.body.id){
        const message = `Request path id ${req.params.id} must match ${req.body.id}`
        console.error(message);
        return res.status(400).send(message);
    }
    console.log(`Updating blogPost ${req.params.id}`);

    const updatedPost = BlogPosts.update({
        id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    });

    res.status(204).end();

});

module.exports = router;



