import resquest from 'supertest'
import { getConnection } from 'typeorm';
import { app } from '../app';
import createConnection from '../database';


describe("Survey", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close;
    })

    it("Should be able to create a new survey", async () => {
        const response = await resquest(app).post("/surveys")
            .send({
                title: "Title Example",
                description: "Description Example"
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    it("Should be able to get all surveys", async () => {
        await resquest(app).post("/surveys")
            .send({
                title: "Title Example2",
                description: "Description Example2"
            });
        const response = await resquest(app).get("/surveys");
        expect(response.body.length).toBe(2);
    });
});

