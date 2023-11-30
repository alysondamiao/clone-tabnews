test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();
  const parsedUpdatedat = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedat);
  expect(responseBody.data_base_version).toBeDefined();
  expect(responseBody.max_connections).toBeDefined();
  expect(responseBody.open_connections).toBeDefined();
});
