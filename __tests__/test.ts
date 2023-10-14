// Import the required modules
import request from "supertest";
import  {app, server } from "../src/app"; // The file that contains your express app
import mongoose, { Schema } from "mongoose";
import { disconnectDB } from "../src/db/mongoose";



// Create a sample task for testing
const sampleTask = {
  title: 'Sample Task',
  description: 'This is a sample task',
  assignedTo: 'john_doe',
  category: 'General',
  dueDate: "2023-06-22T00:07:53.688Z"
};

afterAll(async () => {
  await disconnectDB();
   server.close();
 });
 
const TOKEN =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYwODg4Y2Y5LThiY2EtNDc2Mi1iZjUxLTVhOGRiMTVlNTY5YiIsImlhdCI6MTY5NzExNDc5NH0.TBLgMapYcP6SgygQHSOcwRCcYXy47hJ_ExAtIuCpW7I"


// Test create task
describe('POST /task', () => {
  it('should create a new task', async () => {
    const response = await request(app).post('/api/task').set('Authorization', `Bearer ${TOKEN}`).send(sampleTask);
    expect(response.status).toBe(201);
    expect(response.body.msg).toBe("Task Created Successfully");
    expect(response.body.data.title).toBe(sampleTask.title);
  });
  it('should return invalid token', async () => {
    const response = await request(app).post('/api/task').set('Authorization', `Bearer ${"sdfsdfds"}`).send(sampleTask);
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("Invalid token");    
  });
  it('should return no token', async () => {
    const response = await request(app).post('/api/task').send(sampleTask);
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("No token");    
  });
  it('should give schema validation error', async () => {
    const response = await request(app).post('/api/task').set('Authorization', `Bearer ${TOKEN}`).send({...sampleTask,"test":1});    
    expect(response.status).toBe(422);
    expect(response.body.status).toBe("failed");    
   
  });
});

// Test get task by ID
describe('GET /task/:id', () => {
  it('should retrieve a task by ID', async () => {
    const createdTask = await request(app).post('/api/task').set('Authorization', `Bearer ${TOKEN}`).send(sampleTask);
    
    const taskId = createdTask.body.data._id;    
    
    const response = await request(app).get(`/api/task/${taskId}`).set('Authorization', `Bearer ${TOKEN}`);
    
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(sampleTask.title);
  });

  it('should return 404 for non-existent task', async () => {
    const response = await request(app).get(`/api/task/${new mongoose.Types.ObjectId()}`).set('Authorization', `Bearer ${TOKEN}`);
    expect(response.status).toBe(404);
  });

  it('should return invalid token', async () => {
    const response = await request(app).get(`/api/task/${"taskId"}`).set('Authorization', `Bearer ${"sdfsdfds"}`);
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("Invalid token");    
  });
  it('should return no token', async () => {
    const response = await request(app).get(`/api/task/${"taskId"}`);
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("No token");    
  });
  it('should give schema validation error', async () => {
    const response = await request(app).post('/api/task').set('Authorization', `Bearer ${TOKEN}`).send({...sampleTask,"test":1});
    expect(response.status).toBe(422);
    expect(response.body.status).toBe("failed");    
   
  });
});

describe('PUT /task/:id', () => {
  it('should update a task by ID', async () => {
    const createdTask = await request(app).post('/api/task').set('Authorization', `Bearer ${TOKEN}`).send(sampleTask);
    const taskId = createdTask.body.data._id;
    const updatedTaskData = { ...sampleTask, title: 'Updated Task Title' };
    const response = await request(app).put(`/api/task/${taskId}`).set('Authorization', `Bearer ${TOKEN}`).send(updatedTaskData);
    expect(response.status).toBe(200);
    expect(response.body.data.title).toBe(updatedTaskData.title);
  });

  it('should return 404 for updating a non-existent task', async () => {
    const response = await request(app).put(`/api/task/${new mongoose.Types.ObjectId()}`).set('Authorization', `Bearer ${TOKEN}`).send(sampleTask);
    expect(response.status).toBe(404);
  });
  
  it('should return invalid token', async () => {
    const response = await request(app).put(`/api/task/${""}`).set('Authorization', `Bearer ${"sdfsdfds"}`).send({})
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("Invalid token");    
  });
  it('should return no token', async () => {
    const response = await request(app).put(`/api/task/${""}`).send({})
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("No token");    
  });
  it('should give schema validation error', async () => {
    const response = await request(app).put(`/api/task/${"652520b56a0e317e333ed6a6"}`).set('Authorization', `Bearer ${TOKEN}`).send({})  
    expect(response.status).toBe(422);
    expect(response.body.status).toBe("failed");    
   
  });
});


describe('DELETE /task/:id', () => {
  it('should delete a task by ID', async () => {
    const createdTask = await request(app).post('/api/task').set('Authorization', `Bearer ${TOKEN}`).send(sampleTask);
    const taskId = createdTask.body.data._id;    
    const response = await request(app).delete(`/api/task/${taskId}`).set('Authorization', `Bearer ${TOKEN}`);
    expect(response.status).toBe(200);
    expect(response.body.msg).toBe("Task Deleted Successfully");
  });

  it('should return 404 for deleting a non-existent task', async () => {
    const response = await request(app).delete(`/api/task/${new mongoose.Types.ObjectId()}`).set('Authorization', `Bearer ${TOKEN}`);
    expect(response.status).toBe(404);
  });

  it('should return invalid token', async () => {
    const response = await request(app).delete(`/api/task/${""}`).set('Authorization', `Bearer ${"sdfsdfds"}`).send({})
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("Invalid token");    
  });
  it('should return no token', async () => {
    const response = await request(app).delete(`/api/task/${""}`).send({})
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("No token");    
  });
  it('should give schema validation error', async () => {
    const response = await request(app).delete(`/api/task/${"652520b56a0e317e333ed6"}`).set('Authorization', `Bearer ${TOKEN}`).send({})  
    expect(response.status).toBe(422);
    expect(response.body.status).toBe("failed");    
   
  });
});


describe('GET /tasks', () => {
  it('should retrieve all tasks', async () => {
    await request(app).post('/api/task').set('Authorization', `Bearer ${TOKEN}`).send(sampleTask);
    const response = await request(app).get('/api/tasks').set('Authorization', `Bearer ${TOKEN}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.tasks)).toBe(true);
  });

  it('should return invalid token', async () => {
    const response = await request(app).get('/api/tasks').set('Authorization', `Bearer ${"sdfsdfds"}`).send({})
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("Invalid token");    
  });
  it('should return no token', async () => {
    const response = await request(app).get('/api/tasks').send({})
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("No token");    
  }); 
});

describe('GET /tasks/assignedTo/:username', () => {
  it('should retrieve tasks assigned to a specific user', async () => {
    await request(app).post('/api/task').set('Authorization', `Bearer ${TOKEN}`).send(sampleTask);
    const response = await request(app).get('/api/tasks/assignedTo/john_doe').set('Authorization', `Bearer ${TOKEN}`);
    expect(response.status).toBe(200);
    expect(response.body[0].assignedTo).toBe("john_doe");
    
  });

  it('should return an empty array for a user with no assigned tasks', async () => {    
    const response = await request(app).get('/api/tasks/assignedTo/non_existent_user').set('Authorization', `Bearer ${TOKEN}`);
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe("No task Found Assigned to the user");
    
  });
    it('should return invalid token', async () => {
    const response = await request(app).get('/api/tasks/assignedTo/john_doe').set('Authorization', `Bearer ${"sdfsdfds"}`)
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("Invalid token");    
  });
  it('should return no token', async () => {
    const response = await request(app).get('/api/tasks/assignedTo/john_doe').send({})
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("No token");    
  });

});

describe('GET /tasks/category/:categoryName', () => {
  
  it('should retrieve tasks under a specific category', async () => {
    await request(app).post('/api/task').set('Authorization', `Bearer ${TOKEN}`).send(sampleTask);
    const response = await request(app).get('/api/tasks/category/General').set('Authorization', `Bearer ${TOKEN}`);
    expect(response.status).toBe(200);
    expect(response.body[0].category).toBe("General");
  });

  it('should return an empty array for a non-existent category', async () => {
    const response = await request(app).get('/api/tasks/category/non_existent_category').set('Authorization', `Bearer ${TOKEN}`);
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe("No task Found For Given Category");
  });
  it('should return invalid token', async () => {
    const response = await request(app).get('/api/tasks/category/General').set('Authorization', `Bearer ${"sdfsdfds"}`)
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("Invalid token");    
  });
  it('should return no token', async () => {
    const response = await request(app).get('/api/tasks/category/General').send({})
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("No token");    
  });
});
