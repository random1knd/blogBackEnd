const expect = require('chai').expect;
const { response, json } = require('express');
const request = require('request');
const baseurl = "http://localhost:5000";
/*dikshith*/const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGlrc2hpdGgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjM1NjIwNzF9.xt9bVXwnEfaXmrYcoD_SezO2fx5e8LHn_QOvHBaWHwY'
/*rahul*/const token1= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmFodWwiLCJyb2xlIjoidXNlciIsImlhdCI6MTY2MzU2MjE0MX0.b9MJRyQuyINxDcdAxWOqoQ9N3DqAOH9FDnOtzYVHGXc'



describe("reqeust body invalid",()=>{
    describe("post not authorized",()=>{
        describe("post not found",()=>{

            it("request body invalid",(done)=>{
                const payload = {blogId:""};
                const headers = {"Authorization":`bearer ${token1}`};
                request.post({url:`${baseurl}/approve`,headers,json:payload},(_,response)=>{
                 expect(response.body.message).to.equal("Invalid request body"); 
                 expect(response.statusCode).to.equal(400);
                    done();
                });
            });


            it("post not found",(done)=>{
                const payload = {blogId:"63281e0bbc9d2c0790b80ddb"};
                const headers = {"Authorization":`bearer ${token}`};
                request.post({url:`${baseurl}/approve`,headers,json:payload},(_,response)=>{
                 expect(response.body.message).to.equal("Post not found"); 
                 expect(response.statusCode).to.equal(404);
                    done();
                });
            });


            it("not authorized",(done)=>{
                const payload = {blogId:"63281e0bbc9d2c0790b80ddb"};
                const headers = {"Authorization":`bearer ${token1}`};
                request.post({url:`${baseurl}/approve`,headers,json:payload},(_,response)=>{
                 expect(response.body.message).to.equal("Not authorized"); 
                 expect(response.statusCode).to.equal(403);  
                 done();
                });
            });


            it("post approved successfully",(done)=>{
                const payload = {blogId:"6327fb03c2474fe9ff962570"};
                const headers = {"Authorization":`bearer ${token}`};
                request.post({url:`${baseurl}/approve`,headers,json:payload},(_,response)=>{
                 expect(response.body.message).to.equal("Post successfully approved"); 
                 expect(response.statusCode).to.equal(201);  
                 done();
                });
            });



        });
    });
});