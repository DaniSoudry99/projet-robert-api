module.exports = app => {
    const consultant = require("../controllers/consultant.controller.js");
  
    // Create a new Consultant
    app.post("/consultant", consultant.create);
    
    // Retrieve all Consultant
    app.get("/consultant", consultant.findAll);

    app.post("/consultant/login", consultant.login);

    app.post("/consultant/recap", consultant.recap);
  
    // Retrieve a single Consultant with consultantId
    app.get("/consultant/:consultantId", consultant.findOne);

    // Update a Consultant with consultantId
    app.put("/consultant/:consultantId", consultant.update);
  
    // Delete a Consultant with consultantId
    app.delete("/consultant/:consultantId", consultant.delete);
  
    // Delete all Consultant
    app.delete("/consultant", consultant.deleteAll);
  };
  