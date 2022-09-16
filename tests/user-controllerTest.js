
const expect = require('chai').expect;
const { response, json } = require('express');
const request = require('request')
const baseurl = "http://localhost:5000"


describe("user controller check",()=>{
    describe("user registration check",()=>{
        describe("validation check",()=>{
            
            it("user name missing return 400",(done)=>{
                const payload = {user:"",password:"dikshith123",email:"dikshith@123",description:"this is about me"};
                request.post(`${baseurl}/register`,payload,(_,response)=>{
                    expect(response.statusCode).to.equal(400);
                    done();
                });
            });


            it("email  missing return 400",(done)=>{
                const payload = {user:"dikshith",password:"dikshith123",email:"",description:"this is about me"};
                request.post(`${baseurl}/register`,payload,(_,response)=>{
                    expect(response.statusCode).to.equal(400);
                    done();
                });
            });

            it("description name missing return 400",(done)=>{
                const payload = {user:"",password:"dikshith123",email:"dikshith@123",description:""};
                request.post(`${baseurl}/register`,payload,(_,response)=>{
                    expect(response.statusCode).to.equal(400);
                    done();
                });
            });

            it("password name missing return 400",(done)=>{
                const payload = {user:"",password:"",email:"dikshith@123",description:"this is about me"};
                request.post(`${baseurl}/register`,payload,(_,response)=>{
                    expect(response.statusCode).to.equal(400);
                    done();
                });
            });

           it("password missing throughs error",(done)=>{
            const values = {user:"dikshith",password:"",email:"dikshith@123",description:"thi"}
            request.post(`${baseurl}/register`,values,(_,response)=>{
                // console.log(response.body)
                done();
            })
           })

         

        });
    });
});

describe("user login tests",()=>{
    describe("user name missing and password missing",()=>{
        describe("user doesn't exists or password is wrong ",()=>{
            it("user name is missing",(done)=>{
                const payload = {user:"",password:"password"};
                request.post(`${baseurl}/login`,payload,(_,response)=>{
                    // console.log(response.body)
                    expect(response.statusCode).to.equal(400);

                    done();
                });
            });

            it("password is missing",(done)=>{
                const payload = {user:"dikshith",password:""};
                request.post(`${baseurl}/login`,payload,(_,response)=>{
                    
                    expect(response.statusCode).to.equal(400);
                    done();
                });
            });


            it("missing user name error",(done)=>{
                const payload = {user:"",password:"password"};
                request.post(`${baseurl}/login`,payload,(_,response)=>{
                    const value = JSON.parse(response.body);
                    //console.log(value)
                    expect(value.message).to.equal("both username and password are required");
                    done();
                });
            });


            it("missing password error",(done)=>{
                const payload = {user:"dikshith",password:""};
                request.post(`${baseurl}/login`,payload,(_,response)=>{
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