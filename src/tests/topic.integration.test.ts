import request from "supertest";
import app from "../server";

describe("Topics Integration Tests", () => {
  let topicId: string;
  let subTopicId: string;

  it("Should create a new topic", async () => {
    const response = await request(app).post("/api/topics").send({
      name: "TypeScript Basics",
      content: "Introduction to TypeScript.",
      parentTopicId: null,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("TypeScript Basics");

    topicId = response.body.id;
  });

  it("Should create a subtopic", async () => {
    const response = await request(app).post("/api/topics").send({
      name: "TypeScript Advanced",
      content: "Deep dive into TypeScript.",
      parentTopicId: topicId,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.parentTopicId).toBe(topicId);

    subTopicId = response.body.id;
  });

  it("Should search all topics", async () => {
    const response = await request(app).get("/api/topics");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("Should search for a topic by ID", async () => {
    const response = await request(app).get(`/api/topics/${topicId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(topicId);
  });

  it("Should update a topic", async () => {
    const response = await request(app).patch(`/api/topics/${topicId}`).send({
      content: "Updated TypeScript content.",
    });

    expect(response.status).toBe(201);
    expect(response.body.content).toBe("Updated TypeScript content.");
  });

  it("Should get a specific version of a topic", async () => {
    const response = await request(app).get(`/api/topics/${topicId}?version=1`);

    expect(response.status).toBe(200);
    expect(response.body.version).toBe(1);
  });

  it("Should search for subtopics of a topic", async () => {
    const response = await request(app).get(`/api/topics/${topicId}/subtopics`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.children)).toBe(true);
    expect(response.body.children[0].id).toBe(subTopicId);
  });

  it("Should find the shortest path between two topics", async () => {
    const response = await request(app).get(
      `/api/topics/${topicId}/shortest-path/${subTopicId}`
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
