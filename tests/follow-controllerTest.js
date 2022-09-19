const expect = require('chai').expect;
const { response, json } = require('express');
const request = require('request');
const baseurl = "http://localhost:5000";
/*dikshith*/const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGlrc2hpdGgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjM1NjIwNzF9.xt9bVXwnEfaXmrYcoD_SezO2fx5e8LHn_QOvHBaWHwY'
/*rahul*/const token1= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmFodWwiLCJyb2xlIjoidXNlciIsImlhdCI6MTY2MzU2MjE0MX0.b9MJRyQuyINxDcdAxWOqoQ9N3DqAOH9FDnOtzYVHGXc'


describe("Invalid reqeust body user not provided",()=>{
    describe("user not present",()=>{
        
        it("Invaid request body",(done)=>{
            const payload = {follow:""};
            const headers = {"Authorization":`bearer ${token1}`};
            request.post({url:`${baseurl}/follow`,headers,json:payload},(_,response)=>{
                expect(response.statusCode).to.equal(400);
                expect(response.body.message).to.equal("Invalid request body");
                done();
            });
        });


        it("user not found",(done)=>{
            const payload = {follow:"dikshith33454"};
            const headers = {"Authorization":`bearer ${token1}`};
            request.post({url:`${baseurl}/follow`,headers,json:payload},(_,response)=>{
                expect(response.statusCode).to.equal(400);
                expect(response.body.message).to.equal("user not found");
                done();
            });
        });


        it("user not found",(done)=>{
            const payload = {follow:"dikshith"};
            const headers = {"Authorization":`bearer ${token1}`};
            request.post({url:`${baseurl}/follow`,headers,json:payload},(_,response)=>{
                expect(response.statusCode).to.equal(201);
                expect(response.body.message).to.equal("following successfull");
                done();
            });
        });

        


    });
});