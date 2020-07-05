module.exports = app => {
    const consultation = require("../controllers/consultation.controller.js");
  
    // Create a new Consultation
    app.post("/consultation", consultation.create);
    
    // Retrieve all Consultation
    app.get("/consultation", consultation.findAll);
  
    // Retrieve a single Consultation with consultationId
    app.get("/consultation/:consultationId", consultation.findOne);
  
    // Update a Consultation with consultationId
    app.put("/consultation/:consultationId", consultation.update);
  
    // Delete a Consultation with consultationId
    app.delete("/consultation/:consultationId", consultation.delete);
  
    // Delete all Consultation
    app.delete("/consultation", consultation.deleteAll);
  };
  