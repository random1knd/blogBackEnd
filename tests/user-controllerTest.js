
const expect = require('chai').expect;
const { response, json } = require('express');
const request = require('request')
const baseurl = "http://localhost:5000"

//To register new user
describe("user controller check",()=>{
    describe("user registration check",()=>{
        describe("validation check",()=>{
            //Throws error if username is missing
            it("user name missing return 400",(done)=>{
                const payload = {user:"",password:"dikshith123",email:"dikshith@123",description:"this is about me"};
                request.post(`${baseurl}/register`,{json:payload},(_,response)=>{
                    expect(response.statusCode).to.equal(400);
                    done();
                });
            });

            //Throws error if email is missing
            it("email  missing return 400",(done)=>{
                const payload = {user:"dikshith",password:"dikshith123",email:"",description:"this is about me"};
                request.post(`${baseurl}/register`,{json:payload},(_,response)=>{
                    expect(response.statusCode).to.equal(400);
                    done();
                });
            });
            //Throws error if description is missing
            it("description name missing return 400",(done)=>{
                const payload = {user:"",password:"dikshith123",email:"dikshith@123",description:""};
                request.post(`${baseurl}/register`,{json:payload},(_,response)=>{
                    expect(response.statusCode).to.equal(400);
                    done();
                });
            });

            //Throws error if password is missing
            it("password  missing return 400",(done)=>{
                const payload = {user:"dikshith",password:"",email:"dikshith@123",description:"this is about me"};
                request.post(`${baseurl}/register`,{json:payload},(_,response)=>{
                    expect(response.statusCode).to.equal(400);
                    done();
                });
            });


            it("if password is less than 7 characters",(done)=>{
                const payload = {user:"dikshith",description:"somedescription",email:"dikshith@123"};
                request.post(`${baseurl}/register`,{json:payload},(_,response)=>{
                //console.log(response.body)
                expect(response.body.message).to.equal("password is required and with the right length min 7 characters");
                done();


                });
            });

         
            //Throws error if description is missing
            it("description is missing",(done)=>{
                const payload = {user:"dikshith",password:"password123",description:"",email:"dikshith@123"};
                request.post(`${baseurl}/register`,{json:payload},(_,response)=>{
                //console.log(response.body)
                expect(response.body.message).to.equal("description is required");
                done();

                
                });
            });

            //Throws error if email is missing
            it("email missing email is requried",(done)=>{
                const payload = {user:"dikshith",password:"password123",description:"somedescription",email:""};
                request.post(`${baseurl}/register`,{json:payload},(_,response)=>{
                //console.log(response.body)
                expect(response.body.message).to.equal("email is required");
                done();

                
                });
            });

            //Throws error if the password is less then 7 characters
            it("password is less then 7 characers",(done)=>{
                const payload = {user:"random1knd",password:"123",email:"ranodm@email.com",description:"this is a description"};
                request.post({url:`${baseurl}/register`,json:payload},(_,response)=>{
                expect(response.statusCode).to.equal(400);
                expect(response.body.message).to.equal("password is required and with the right length min 7 characters");
                done();    

                });

            });

            //remove comments when username and email are replaced
            // it("user created",(done)=>{
            //     const payload = {user:"random1knd",password:"12345678",email:"ranodm@email.com",description:"this is a description"};
            //     request.post({url:`${baseurl}/register`,json:payload},(_,response)=>{
            //     expect(response.statusCode).to.equal(201);
            //     expect(response.body.message).to.equal("user has been created");
            //     done();    

            //     });

            // });



        });
    });
});


//To login
describe("user login test",()=>{
    describe("username or password missing",()=>{
        describe("username not present or password is wrong",()=>{
            //Throws error is username is missing
            it("username missing",(done)=>{
                const payload = {user:"",password:"password123"};
                request.post(`${baseurl}/login`,{json:payload},(_,response)=>{
                //console.log(response.body)
                expect(response.statusCode).to.equal(400);
                
                expect(response.body.message).to.equal("both username and password are required");
                done();

                
                });
            });

            //Throws if password is missing
            it("password missing",(done)=>{
                const payload = {user:"dikshith",password:""};
                request.post(`${baseurl}/login`,{json:payload},(_,response)=>{
                //console.log(response.body)
                expect(response.statusCode).to.equal(400);
                expect(response.body.message).to.equal("both username and password are required");
                done();

                
                });
            });

            //Throws error if password does not match 
            it("password doesnot match",(done)=>{
                const payload = {user:"dikshith",password:"asdfsadf"};
                request.post(`${baseurl}/login`,{json:payload},(_,response)=>{
                //console.log(response.body)
                expect(response.statusCode).to.equal(403);
                expect(response.body.message).to.equal("password does not match");
                done();

                
                });
            });

            //If all the credentials are right 
            it("logged in",(done)=>{
                const payload = {user:"dikshith",password:"dikshith123"};
                request.post(`${baseurl}/login`,{json:payload},(_,response)=>{
                //console.log(response.body)
                expect(response.statusCode).to.equal(200);
                expect(response.body.message).to.equal("logged in");
                done();

                
                });
            });



         

        });
    });
});