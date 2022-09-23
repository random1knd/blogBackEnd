const expect = require('chai').expect;
const { response, json } = require('express');
const request = require('request');
const baseurl = "http://localhost:5000";
/*dikshith*/const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGlrc2hpdGgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjM1NjIwNzF9.xt9bVXwnEfaXmrYcoD_SezO2fx5e8LHn_QOvHBaWHwY'
/*rahul*/const token1= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmFodWwiLCJyb2xlIjoidXNlciIsImlhdCI6MTY2MzU2MjE0MX0.b9MJRyQuyINxDcdAxWOqoQ9N3DqAOH9FDnOtzYVHGXc'



describe("Invalid request ",()=>{
    describe("comment not found",()=>{
        //Throws error when object is not given in the body
        it("Invalid request body",(done)=>{
            const payload = {object:""};
            const headers = {'Authorization':`bearer ${token1}`};
            request.post({url:`${baseurl}/like`,headers,json:payload},(_,response)=>{
                expect(response.body.message).to.equal("invalid request  body");
                expect(response.statusCode).to.equal(400);
                done();
            });
        });


        //Throws error if the given object id is not present in the db
        it("comment not found",(done)=>{
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



describe("request body invalid",()=>{
    describe("comment not found",()=>{
        
        //Throws error if commentId is not given
        it("reqeust body not valid",(done)=>{
            const payload = {commentId:""};
            request.post({url:`${baseurl}/likes`},(_,response)=>{
                //expect(response.statusCode).to.equal(400);
                const value = JSON.parse(response.body);
                expect(value.message).to.equal("Invalid request body");
                expect(response.statusCode).to.equal(400);
                done();
            });
        });


        //Throws error if the commentId is not present in the db
        it("comment not found",(done)=>{
            const payload = {commentId:"34534t34tgd"};
            request.post({url:`${baseurl}/likes`, json:payload},(_,response)=>{
                
                
                expect(response.body.message).to.equal("object not found");
              
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
    });
});
