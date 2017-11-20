const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('Blog Posts', function(){

    before(function(){
        return runServer();
    });

    after(function(){
        return closeServer();
    });

    it('should return a list of items by using GET', function(){
        return chai.request(app)
            .get('/blog-posts')
            .then(res => {
                res.should.have.status(200);
                res.should.be.json;

                res.body.forEach(item => {
                    item.should.be.a('object');
                });
            });
    });

    it('should add an item to the blog when using POST', function(){
        const newPost = {title: 'How to Test Code', author: 'Ryan Sabo', content: 'Teaches you Mocha and Chai'};
        return chai.request(app)
            .post('/blog-posts')
            .send(newPost)
            .then(function(res){
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.include.keys('title','author','content');
            });
    });

    it('should edit a post when using PUT', function(){
        const updatePost = {
            title: 'blah',
            author: 'blah blah',
            content: 'blah blah blah'
        };

        return chai.request(app)
            .get('/blog-posts')
            .then(function(res){
                updatePost.id = res.body[0].id;

                return chai.request(app)
                .put(`/blog-posts/${updatePost.id}`)
                .send(updatePost);
            })
            .then(function(res){
                res.should.have.status(204);
            });
    });

    it('should delete posts when using DELETE', function(){
        return chai.request(app)
            .get('/blog-posts')
            .then(function(res){
                return chai.request(app)
                    .delete(`/blog-posts/${res.body[0].id}`);
            })
            .then(function(res){
                res.should.have.status(204);
            })
    });
});