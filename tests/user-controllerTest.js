
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
                    console.log(`let's see if the response changes${response.body.message}`)

                })
            })

         

        });
    });
});

describe("user login tests",()=>{
    describe("user name missing and password missing",()=>{
        describe("user doesn't exists or password is wrong ",()=>{
            it("user name is missing",(done)=>{
                const payload = {password:"password"};
                request.post(`${baseurl}/login`,{json:payload},(_,response)=>{
                    console.log(`from user name is missing login ${response.body}`)
                    // console.log(response.body)
                    expect(response.statusCode).to.equal(400);

                    done();
                });
            });

            it("password is missing",(done)=>{
                const payload = {user:"dikshith",password:""};
                request.post(`${baseurl}/login`,{json:payload},(_,response)=>{
                    
                    expect(response.statusCode).to.equal(400);
                    done();
                });
            });


            it("missing user name error",(done)=>{
                const payload = {user:"dikshith",password:"password"};
                request.post(`${baseurl}/login`,{json:payload},(_,response)=>{
                    const value = JSON.parse(response.body);
                    //console.log(value)
                    expect(value.message).to.equal("both username and password are required");
                    done();
                });
            });


            it("missing password error",(done)=>{
                const payload = {user:"dikshith",password:""};
                request.post(`${baseurl}/login`,{json:payload},(_,response)=>{
                    const value = JSON.parse(response.body);
                    //console.log(value)
                    expect(value.message).to.equal("both username and password are required");
                    done();
                });
            });

            





        });
    });
});
// desctibe("different one",()=>{
//     it("value are not different",(done)=>{
//         const values = {user:"dikshith",password:"",email:"dikshith@123",description:"this is about me"}
//         request.post(`${baseurl}/register`,payload,(_,response)=>{
//             expect(response.body.message).to.equal("password is required");
//             done();
//         });
//     });
// });

describe("password is wrong",()=>{
    it("password is wrong ",(done)=>{
        const payload = {user:"dikshith",password:"password"}
        request.post(`${baseurl}/login`,{json:payload},(_,response)=>{
            console.log(`password is wrong ${response.body}`);
            expect(response.body.message).to.equal("password does not match");
            
            done();
        })
    })
 


})