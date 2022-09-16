const expect = require('chai').expect;
const { response, json } = require('express');
const request = require('request')
const baseurl = "http://localhost:5000"


/*
describe("testing if the password is missing",()=>{
    it("user exists and loign",(done)=>{
        const payload = {user:"dikshiht",password:"dikshith123"}
        request.post(`${baseurl}/login`,paylod,(_,response)=>{
            console.log(response.body)
            //expect(response.statusCode).to.equal(200)
            done();
        });
    });

})
*/