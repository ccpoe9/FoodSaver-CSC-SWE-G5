import supertest from 'supertest'
import usercontroller from './user.controller.js'

describe("POST /user"), () => {

    describe("given customer user and password", () => {
        //save customer user and password
        //respond with status 200 to know success
        test("should respond with 200 code", async() => {
            const response = await request(usercontroller).post("/user").send({
                username: "Username",
                password: "Password"
            })
            expect(response.statusCode).tobe(200)
        })
        //response when successful 
        test("should specify json in content type header", async () => {
             const response = await request(usercontroller).post("/user").send({
                username: "Username",
                password: "Password"    
            })
            expect(response.header['content-type']).toEqual(expect.stringContaining("json")) 
        })
        test("respone has userId", async () =>{
            const response = await request(usercontroller).post("/users").send({
                username: "Username",
                password: "Password"
            })
            expect(response.body.userId).toBeDefined()
        })
       
    })

    describe(" when user and password is missing", () => {
        test("response is 400", async () => {
             //respond code 400 to know error
        //fail to add user or password 

            const bodyData = [
                {username: "Username"},
                {password: "Password"},
                {}
            ]
            for (const body of bodyData){
            const response = await request(usercontroller).post("/users").send(body)
            expect(response.statusBody).toBe(400)
           }   
        })
        //respond code 400 to know error
        //fail to add user or password 


    })
}
