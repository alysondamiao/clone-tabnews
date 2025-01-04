import database from "infra/database.js";

test("PUT to /api/v1/migrations should return 200", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "PUT",
  });
  expect(response1.status).toBe(405);
});
