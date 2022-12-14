
const expect = require('chai').expect;
const { response, json } = require('express');
const request = require('request');
const baseurl = "http://localhost:5000";
/*dikshith*/const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGlrc2hpdGgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjM1NjIwNzF9.xt9bVXwnEfaXmrYcoD_SezO2fx5e8LHn_QOvHBaWHwY'
/*rahul*/const token1= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmFodWwiLCJyb2xlIjoidXNlciIsImlhdCI6MTY2MzU2MjE0MX0.b9MJRyQuyINxDcdAxWOqoQ9N3DqAOH9FDnOtzYVHGXc'

//REPLACE THE POST DELETE BEFORE RUNNING 
const postDelete = '632804b6d32551e582c82985';


//To post a post 
describe("fields missing",()=>{
    //Throws error if the post title is missing
   it("title is missing",(done)=>{
        const payload = {title:"",description:"this is about the blog",blogData:"this is the main thing"};
        const headers = {'Authorization':`bearer ${token}`};
        request.post({url:`${baseurl}/post`,headers,json:payload},(_,response)=>{
            expect(response.statusCode).to.equal(400);
            expect(response.body.message).to.equal("title is required");
            done();
        });
   });

   //Throws error if description is missing
   it("description is missing",(done)=>{
    const payload = {title:"this is the titlee",description:"",blogData:"this is the main thing"};
    const headers = {'Authorization':`bearer ${token}`};
    request.post({url:`${baseurl}/post`,headers,json:payload},(_,response)=>{
        expect(response.statusCode).to.equal(400);
        expect(response.body.message).to.equal("description is required");
        done();
    });
});

//Throws error if the in blog body is missing
it("blog information is missing",(done)=>{
    const payload = {title:"this is the title",description:"this is about the blog",blogData:""};
    const headers = {'Authorization':`bearer ${token}`};
    request.post({url:`${baseurl}/post`,headers,json:payload},(_,response)=>{
        expect(response.statusCode).to.equal(400);
        expect(response.body.message).to.equal("post information is required");
        done();
    });
});


//If all the credentials are present new post get's created
it("new post created",(done)=>{
    const payload = {title:"title of the post",description:"this is about the blog",blogData:"this is the main thing"};
    const headers = {'Authorization':`bearer ${token}`};
    request.post({url:`${baseurl}/post`,headers,json:payload},(_,response)=>{
        expect(response.statusCode).to.equal(201);
        expect(response.body.message).to.equal("new post has been created");
        done();
    });
});
    
});

//To update the post
describe("blog id is missing",()=>{
    describe("post not found with the given id ",()=>{
        describe("given id is wrong make sure it is right ",()=>{
            describe("not authorized",()=>{
                //Throws error if blogs unique id is not sent
                it("blog id is missing",(done)=>{
                const payload = {title:"new title",description:"this has been updated once",blogData:"main information updated",blogId:''};
                const headers = {'Authorization':`bearer ${token}`};
                request.put({url:`${baseurl}/post`,headers,json:payload},(_,response)=>{
                    expect(response.statusCode).to.equal(400);
                    expect(response.body.message).to.equal('request body not valid');
                    done();
                });
                });

                //Throws error id the given id is not present in the db
                it("post not found",(done)=>{
                    const payload = {title:"new title",description:"this has been updated once",blogData:"main information updated",blogId:'6327fb03c2474fe9ff962510'};
                    const headers = {'Authorization':`bearer ${token}`};
                    request.put({url:`${baseurl}/post`,headers,json:payload},(_,response)=>{
                        expect(response.statusCode).to.equal(404);
                        expect(response.body.message).to.equal('post not found');
                        done();
                    });
                    });


                    it("something went wrong make sure the id is right",(done)=>{
                        const payload = {title:"new title",description:"this has been updated once",blogData:"main information updated",blogId:'6327fb03c2474fe9ff9625'};
                        const headers = {'Authorization':`bearer ${token}`};
                        request.put({url:`${baseurl}/post`,headers,json:payload},(_,response)=>{
                            expect(response.statusCode).to.equal(400);
                            expect(response.body.message).to.equal('something went wrong make sure the id is right');
                            done();
                        });
                        });

                        //throws error if the user trying to update the post is not the same person who made the post
                        it("not authorized",(done)=>{
                            const payload = {title:"new title",description:"this has been updated once",blogData:"main information updated",blogId:'6327fb03c2474fe9ff962570'};
                            const headers = {'Authorization':`bearer ${token}`};
                            request.put({url:`${baseurl}/post`,headers,json:payload},(_,response)=>{
                                expect(response.statusCode).to.equal(403);
                                expect(response.body.message).to.equal('not authorized');
                                done();
                            });
                            });

                            //if all the credentials are present and the user logic satifies , post successfully get's updated
                            it("post updated successfully",(done)=>{
                                const payload = {title:"new title",description:"this has been updated once",blogData:"main information updated",blogId:'6327fb03c2474fe9ff962570'};
                                const headers = {'Authorization':`bearer ${token1}`};
                                request.put({url:`${baseurl}/post`,headers,json:payload},(_,response)=>{
                                    expect(response.statusCode).to.equal(200);
                                    expect(response.body.message).to.equal('post updated successfully');
                                    done();
                                });
                                });
    





            });
        });
    });
});



describe("post delete",()=>{
    describe("post not found",()=>{
        describe("something wrong with the given id ",()=>{
            describe("not authorized",()=>{

                //Throws error if blog id is not present
                 it("request body not valid",(done)=>{
                    const payload =  {blogId:""};
                    const headers = {'Authorization':`bearer ${token1}`};
                    
                    request.delete({url:`${baseurl}/post`,headers,json:payload},(_,response)=>{
                        expect(response.statusCode).to.equal(400);
                        expect(response.body.message).to.equal("Invalid request");
                        done();
                    });
                });


                //If error occurs at mongodb throws error
                it("something wrong with the id",(done)=>{
                    const payload =  {blogId:"6327fb03c2474fe9ff962"};
                    const headers = {'Authorization':`bearer ${token1}`};
                    
                    request.delete({url:`${baseurl}/post`,headers,json:payload},(_,response)=>{
                        expect(response.statusCode).to.equal(400);
                        expect(response.body.message).to.equal('something went wrong make sure the id is right');
                        done();
                    });
                });


                
                // it("post not found",(done)=>{
                //     const payload =  {blogId:"63280453582df689d2bc2726"};
                //     const headers = {'Authorization':`bearer ${token1}`};
                    
                //     request.delete({url:`${baseurl}/post`,headers,json:payload},(_,response)=>{
                //         //expect(response.statusCode).to.equal(404);
                //         expect(response.body.message).to.equal('post not found')
                //         done();
                //     });
                // });

// REMOVE COMMENTS ONLY IF POST DELETE IS REPLACED


                // it("Not authorized",(done)=>{
                //     const payload =  {blogId:postDelete};
                //     const headers = {'Authorization':`bearer ${token1}`};
                    
                //     request.delete({url:`${baseurl}/post`,headers,json:payload},(_,response)=>{
                //         expect(response.statusCode).to.equal(403);
                //         expect(response.body.message).to.equal('not authorized user');
                //         done();
                //     });
                // });



                // it("post deleted successfully",(done)=>{
                //     const payload =  {blogId:postDelete};
                //     const headers = {'Authorization':`bearer ${token}`};
                    
                //     request.delete({url:`${baseurl}/post`,headers,json:payload},(_,response)=>{
                //         expect(response.statusCode).to.equal(200);
                //         expect(response.body.message).to.equal('post deleted successfully');
                //         done();
                //     });
                // });
                


            });
        });
    });
});

//fetches approved posts
describe("get approved posts",()=>{
    it("approved posts",(done)=>{
        request.get({url:`${baseurl}/getPosts`},(_response)=>{
            expect(response.statusCode).to.equal(200);
            done();
        })
    })
})