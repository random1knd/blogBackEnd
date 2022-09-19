const expect = require('chai').expect;
const { response, json } = require('express');
const request = require('request');
const baseurl = "http://localhost:5000";
/*dikshith*/const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGlrc2hpdGgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjM1NjIwNzF9.xt9bVXwnEfaXmrYcoD_SezO2fx5e8LHn_QOvHBaWHwY'
/*rahul*/const token1= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmFodWwiLCJyb2xlIjoidXNlciIsImlhdCI6MTY2MzU2MjE0MX0.b9MJRyQuyINxDcdAxWOqoQ9N3DqAOH9FDnOtzYVHGXc'

//ALWAYS REPLACE POST ID BEFORE RUNNING TEST CASES AND MAKE SURE THE POST WITH POST ID IS PRESENT
const postId = '632805b308c330b48ed2b95e';

//MAKE SURE THIS COMMENT UPDATE IS ALWAYS PRESENT
const commentUpdate = '632822ffad7ad55995271faa';

//MAKE SURE THIS IS REPLACED IT IS DELETED AFTER SUCCESSFULL EXECUTION EVERY TIME 
const commentDelete = '63281e0bbc9d2c0790b80ddb';

describe("post id not found",()=>{
    describe("post information not found",()=>{
       
        it("post id not present",(done)=>{
            const payload = {blogId:"",comment:"this is a comment"};
            const headers = {'Authorization':`bearer ${token1}`};
            request.post({url:`${baseurl}/comment`,headers,json:payload},(_,response)=>{
                    expect(response.statusCode).to.equal(400);
                    expect(response.body.message).to.equal("blog id is required");
                    done();
            });
        });


        it("post id not found",(done)=>{
            const payload = {blogId:"632804b6d32551e582c82985",comment:"this is a comment"};
            const headers = {'Authorization':`bearer ${token1}`};
            request.post({url:`${baseurl}/comment`,headers,json:payload},(_,response)=>{
                    expect(response.body.message).to.equal("post not found");
                    expect(response.statusCode).to.equal(400)
                    done();
            });
        });


        it("something went wrong",(done)=>{
            const payload = {blogId:'65464',comment:"this is a comment"};
            const headers = {'Authorization':`bearer ${token1}`};
            request.post({url:`${baseurl}/comment`,headers,json:payload},(_,response)=>{
                    expect(response.body.message).to.equal("something went wrong");
                    expect(response.statusCode).to.equal(400);
                    done();
            });
        });


        it("comment created",(done)=>{
            const payload = {blogId:postId,comment:"this is a comment"};
            const headers = {'Authorization':`bearer ${token1}`};
            request.post({url:`${baseurl}/comment`,headers,json:payload},(_,response)=>{
                    expect(response.body.message).to.equal("comment successfully created");
                    expect(response.statusCode).to.equal(201);
                    done();
            });
        });


        


    });
});


describe("for updating , comment id not found",()=>{
    describe("something went wrong",()=>{
        describe("not authorized",()=>{

            it("request body invalid",(done)=>{
                const payload = {commentId:"",comment:"this is a comment"};
                const headers = {'Authorization':`bearer ${token1}`};
                request.put({url:`${baseurl}/comment`,headers,json:payload},(_,response)=>{
                        expect(response.body.message).to.equal("Request body Invalid");
                        expect(response.statusCode).to.equal(400);
                        done();
                });
            });


            it("comment not found",(done)=>{
                const payload = {commentId:"63281df64894fd5ca6a09040",comment:"this is a comment"};
                const headers = {'Authorization':`bearer ${token1}`};
                request.put({url:`${baseurl}/comment`,headers,json:payload},(_,response)=>{
                        expect(response.body.message).to.equal("comment not found");
                        expect(response.statusCode).to.equal(404);
                        done();
                });
            });
            

            it("something went wrong",(done)=>{
                const payload = {commentId:"63281df64",comment:"this is a comment"};
                const headers = {'Authorization':`bearer ${token1}`};
                request.put({url:`${baseurl}/comment`,headers,json:payload},(_,response)=>{
                        expect(response.body.message).to.equal("something went wrong make sure the id is right");
                        expect(response.statusCode).to.equal(400);
                        done();
                });
            });


            it("not authorized",(done)=>{
                const payload = {commentId:commentUpdate,comment:"this comment has been updated"};
                const headers = {'Authorization':`bearer ${token1}`};
                request.put({url:`${baseurl}/comment`,headers,json:payload},(_,response)=>{
                        expect(response.body.message).to.equal("Not authorized");
                        expect(response.statusCode).to.equal(403);
                        done();
                });
            });


            it("comment updated successfully",(done)=>{
                const payload = {commentId:commentUpdate,comment:"this comment has been updated once"};
                const headers = {'Authorization':`bearer ${token}`};
                request.put({url:`${baseurl}/comment`,headers,json:payload},(_,response)=>{
                        expect(response.body.message).to.equal("comment successfully updated");
                        expect(response.statusCode).to.equal(200);
                        done();
                });
            });







        });
    });
});



describe("comment not found",()=>{
    describe("something went wrong ",()=>{
        describe("not authorized",()=>{

            it("comment id not valid",(done)=>{
                const payload = {commentId:"",comment:"this comment has been updated once"};
                const headers = {'Authorization':`bearer ${token}`};
                request.delete({url:`${baseurl}/comment`,headers,json:payload},(_,response)=>{
                        expect(response.body.message).to.equal("Invalid request body");
                        expect(response.statusCode).to.equal(400);
                        done();
                });
            });



            it("comment not found",(done)=>{
                const payload = {commentId:"63281df64894fd5ca6a09040",comment:"this comment has been updated once"};
                const headers = {'Authorization':`bearer ${token}`};
                request.delete({url:`${baseurl}/comment`,headers,json:payload},(_,response)=>{
                        expect(response.body.message).to.equal("comment  not found");
                        expect(response.statusCode).to.equal(400);
                        done();
                });
            });


            
            it("something went wrong",(done)=>{
                const payload = {commentId:"34534",comment:"this comment has been updated once"};
                const headers = {'Authorization':`bearer ${token}`};
                request.delete({url:`${baseurl}/comment`,headers,json:payload},(_,response)=>{
                        expect(response.body.message).to.equal("something went wrong make sure the id is right");
                        expect(response.statusCode).to.equal(400);
                        done();
                });
            });


            
            // it("not authorized",(done)=>{
            //     const payload = {commentId:commentDelete,comment:"this comment has been updated once"};
            //     const headers = {'Authorization':`bearer ${token}`};
            //     request.delete({url:`${baseurl}/comment`,headers,json:payload},(_,response)=>{
            //             expect(response.body.message).to.equal("Not authorized");
            //             expect(response.statusCode).to.equal(403);
            //             done();
            //     });
            // });


            // it("comment deleted",(done)=>{
            //     const payload = {commentId:commentDelete,comment:"this comment has been updated once"};
            //     const headers = {'Authorization':`bearer ${token1}`};
            //     request.delete({url:`${baseurl}/comment`,headers,json:payload},(_,response)=>{
            //             expect(response.body.message).to.equal("comment successfully deleted");
            //             expect(response.statusCode).to.equal(200);
            //             done();
            //     });
            // });
            





        });
    });
});