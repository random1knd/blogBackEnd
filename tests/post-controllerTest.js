const expect = require('chai').expect;
const { response, json } = require('express');
const request = require('request')
const baseurl = "http://localhost:5000"

describe("post values missing",()=>{
    it("title is missing",(done)=>{
        const payload = {description:"dikshith",blogData:"something"};
        const headers = 
        request.post(`${baseurl}/post`,payload,(_,response)=>{
            console.log(`from title is missing ${response.body}`);
            expect(response.statusCode).to.equal(400)
            
            done();
        });
    });

});