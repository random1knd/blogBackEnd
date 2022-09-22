const expect = require('chai').expect;
const { response, json } = require('express');
const request = require('request');
const baseurl = "http://localhost:5000";
/*dikshith*/const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGlrc2hpdGgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjM1NjIwNzF9.xt9bVXwnEfaXmrYcoD_SezO2fx5e8LHn_QOvHBaWHwY'
/*rahul*/const token1= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmFodWwiLCJyb2xlIjoidXNlciIsImlhdCI6MTY2MzU2MjE0MX0.b9MJRyQuyINxDcdAxWOqoQ9N3DqAOH9FDnOtzYVHGXc'


//To approve a post
describe("reqeust body invalid",()=>{
    describe("post not authorized",()=>{
        describe("post not found",()=>{
            //Throws error if blogId is not provdied 
            it("request body invalid",(done)=>{
                const payload = {blogId:""};
                const headers = {"Authorization":`bearer ${token1}`};
                request.post({url:`${baseurl}/approve`,headers,json:payload},(_,response)=>{
                 expect(response.body.message).to.equal("Invalid request body"); 
                 expect(response.statusCode).to.equal(400);
                    done();
                });
            });

            //throws 404 error if blog id is not found
            it("post not found",(done)=>{
                const payload = {blogId:"63281e0bbc9d2c0790b80ddb"};
                const headers = {"Authorization":`bearer ${token}`};
                request.post({url:`${baseurl}/approve`,headers,json:payload},(_,response)=>{
                 expect(response.body.message).to.equal("Post not found"); 
                 expect(response.statusCode).to.equal(404);
                    done();
                });
            });

            //Throws 403 not authorized error if the user who is trying to approve is not an admin
            it("not authorized",(done)=>{
                const payload = {blogId:"63281e0bbc9d2c0790b80ddb"};
                const headers = {"Authorization":`bearer ${token1}`};
                request.post({url:`${baseurl}/approve`,headers,json:payload},(_,response)=>{
                 expect(response.body.message).to.equal("Not authorized"); 
                 expect(response.statusCode).to.equal(403);  
                 done();
                });
            });

            //if the all credentials are right and the user also admin privilages post get's approved
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


//To fetch posts which are pending
describe("posts not found",()=>{
    describe("not authorized",()=>{
        //Throws 403 not authorized error if the user who doesn't admin privilages tries to fetch pending posts
        it("not authorized",(done)=>{
            const headers = {'Authorization':`bearer ${token1}`};
            request.post({url:`${baseurl}/adminPosts`,headers},(_,response)=>{
                expect(response.statusCode).to.equal(403);
                const value = JSON.parse(response.body);
                //console.log(response.body);
                expect(value.message).to.equal("Not authorized");
                done();
            });

        });


        //fetches pending posts if the party has role as admin
        it("pending posts",(done)=>{
            const headers = {'Authorization':`bearer ${token}`};
            request.post({url:`${baseurl}/adminPosts`,headers},(_,response)=>{
                expect(response.statusCode).to.equal(200);
                const value = JSON.parse(response.body);
                //console.log(response.body);
                expect(value.success).to.equal(true);
                done();
            });

        });


    });
});