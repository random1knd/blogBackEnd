const expect = require('chai').expect;
const { response, json } = require('express');
const request = require('request');
const baseurl = "http://localhost:5000";
/*dikshith*/const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGlrc2hpdGgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjM1NjIwNzF9.xt9bVXwnEfaXmrYcoD_SezO2fx5e8LHn_QOvHBaWHwY'
/*rahul*/const token1= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmFodWwiLCJyb2xlIjoidXNlciIsImlhdCI6MTY2MzU2MjE0MX0.b9MJRyQuyINxDcdAxWOqoQ9N3DqAOH9FDnOtzYVHGXc'

describe("Invalid request ",()=>{
    describe("comment not found",()=>{

        it("Invalid request body",(done)=>{
            const payload = {object:""};
            const headers = {'Authorization':`bearer ${token1}`};
            request.post({url:`${baseurl}/like`,headers,json:payload},(_,response)=>{
                expect(response.body.message).to.equal("invalid request  body");
                expect(response.statusCode).to.equal(400);
                done();
            });
        });



        it("Invalid request body",(done)=>{
            const payload = {object:"63281df64894fd5ca6a09040"};
            const headers = {'Authorization':`bearer ${token1}`};
            request.post({url:`${baseurl}/like`,headers,json:payload},(_,response)=>{
                expect(response.statusCode).to.equal(400);
                expect(response.body.message).to.equal("comment not found");
                done();
            });
        });


// error once 
        
        // it("comment liked successfully",(done)=>{
        //     const payload = {object:"632822ffad7ad55995271faa"};
        //     const headers = {'Authorization':`bearer ${token1}`};
        //     request.post({url:`${baseurl}/like`,headers,json:payload},(_,response)=>{
        //         expect(response.statusCode).to.equal(201);
        //         expect(response.body.message).to.equal("liked");
        //         done();
        //     });
        // });
        
     


    });
});




