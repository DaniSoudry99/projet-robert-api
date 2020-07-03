module.exports = app => {
    const client = require("../controllers/client.controller.js");
  
    // Create a new Client
    app.post("/client", client.create);
    
    // Retrieve all Client
    app.get("/client", client.findAll);
  
    // Retrieve a single Client with clientId
    app.get("/client/:clientId", client.findOne);
  
    // Update a Client with clientId
    app.put("/client/:clientId", client.update);
  
    // Delete a Client with clientId
    app.delete("/client/:clientId", client.delete);
  
    // Create a new Client
    app.delete("/client", client.deleteAll);
  };
  