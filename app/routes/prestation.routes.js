module.exports = app => {
    const prestation = require("../controllers/prestation.controller.js");
  
    // Create a new Prestation
    app.post("/prestation", prestation.create);
    
    // Retrieve all Prestation
    app.get("/prestation", prestation.findAll);
  
    // Retrieve a single Prestation with prestationId
    app.get("/prestation/:prestationId", prestation.findOne);
  
    // Update a Prestation with prestationId
    app.put("/prestation/:prestationId", prestation.update);
  
    // Delete a Prestation with prestationId
    app.delete("/prestation/:prestationId", prestation.delete);
  
    // Delete all Prestation
    app.delete("/prestation", prestation.deleteAll);
  };
  