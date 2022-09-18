
const expect = require('chai').expect;
const { response, json } = require('express');
const request = require('request')
const baseurl = "http://localhost:5000"


describe("user controller check",()=>{
    describe("user registration check",()=>{
        describe("validation check",()=>{
            
            it("user name missing return 400",(done)=>{
                const payload = {user:"",password:"dikshith123",email:"dikshith@123",description:"this is about me"};
                request.post(`${baseurl}/register`,{json:payload},(_,response)=>{
                    expect(response.statusCode).to.equal(400);
                    done();
                });
            });


            it("email  missing return 400",(done)=>{
                const payload = {user:"dikshith",password:"dikshith123",email:"",description:"this is about me"};
                request.post(`${baseurl}/register`,{json:payload},(_,response)=>{
                    expect(response.statusCode).to.equal(400);
                    done();
                });
            });

            it("description name missing return 400",(done)=>{
                const payload = {user:"",password:"dikshith123",email:"dikshith@123",description:""};
                request.post(`${baseurl}/register`,{json:payload},(_,response)=>{
                    expect(response.statusCode).to.equal(400);
                    done();
                });
            });

            it("password name missing return 400",(done)=>{
                const payload = {user:"dikshith",password:"",email:"dikshith@123",description:"this is about me"};
                request.post(`${baseurl}/register`,{json:payload},(_,response)=>{
                    expect(response.statusCode).to.equal(400);
                    done();
                });
            });

            it("password missing expected password is requried",(done)=>{
                const payload = {user:"dikshith",description:"somedescription",email:"dikshith@123"};
                request.post(`${baseurl}/register`,{json:payload},(_,response)=>{
                //console.log(response.body)
                expect(response.body.message).to.equal("password is required and with the right length min 7 characters");
                done();


                });
            });

         
            
            it("password missing expected password is requried",(done)=>{
                const payload = {user:"dikshith",password:"password123",description:"",email:"dikshith@123"};
                request.post(`${baseurl}/register`,{json:payload},(_,response)=>{
                //console.log(response.body)
                expect(response.body.message).to.equal("description is required");
                done();

                
                });
            });

            
            it("password missing expected password is requried",(done)=>{
                const payload = {user:"dikshith",password:"password123",description:"somedescription",email:""};
                request.post(`${baseurl}/register`,{json:payload},(_,response)=>{
                //console.log(response.body)
                expect(response.body.message).to.equal("email is required");
                done();

                
                });
            });

        });
    });
});



describe("user login test",()=>{
    describe("username or password missing",()=>{
        describe("username not present or password is wrong",()=>{
            
            it("username missing",(done)=>{
                const payload = {user:"",password:"password123"};
                request.post(`${baseurl}/login`,{json:payload},(_,response)=>{
                //console.log(response.body)
                expect(response.statusCode).to.equal(400);
                
                expect(response.body.message).to.equal("both username and password are required");
                done();

                
                });
            });


            it("password missing",(done)=>{
                const payload = {user:"dikshith",password:""};
                request.post(`${baseurl}/login`,{json:payload},(_,response)=>{
                //console.log(response.body)
                expect(response.statusCode).to.equal(400);
                expect(response.body.message).to.equal("both username and password are required");
                done();

                
                });
            });


            it("password missing",(done)=>{
                const payload = {user:"dikshith",password:"asdfsadf"};
                request.post(`${baseurl}/login`,{json:payload},(_,response)=>{
                //console.log(response.body)
                expect(response.statusCode).to.equal(403);
                expect(response.body.message).to.equal("password does not match");
                done();

                
                });
            });


            it("password missing",(done)=>{
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