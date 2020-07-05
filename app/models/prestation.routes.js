module.exports = app => {
    const prestation = require("../controllers/prestation.controller.js");
  
    // Create a new Etat
    app.post("/prestation", prestation.create);
    
    // Retrieve all Etat
    app.get("/prestation", prestation.findAll);
  
    // Retrieve a single Etat with etatId
    app.get("/prestation/:prestationId", prestation.findOne);
  
    // Update a Etat with etatId
    app.put("/prestation/:etatId", prestation.update);
  
    // Delete a Etat with etatId
    app.delete("/prestation/:etatId", prestation.delete);
  
    // Create a new Etat
    app.delete("/prestation", prestation.deleteAll);
  };
  