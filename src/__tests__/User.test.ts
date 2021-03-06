import resquest from 'supertest'
import { app } from '../app';
import createConnection from '../database';


describe("User", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    it("Should be able to create a new user", async () => {
        const response = await resquest(app).post("/users")
            .send({
                email: "user2@example.com",
                name: "User2 Example"
            });
        expect(response.status).toBe(201);
    });

    it("Should not be able to create a user with exists email", async () => {
        const response = await resquest(app).post("/users")
            .send({
                email: "user@example.com",
                name: "Example"
            });
        expect(response.status).toBe(400);
    });
});

