module.exports = app => {
    const etat = require("../controllers/etat.controller.js");
  
    // Create a new Etat
    app.post("/etat", etat.create);
    
    // Retrieve all Etat
    app.get("/etat", etat.findAll);
  
    // Retrieve a single Etat with etatId
    app.get("/etat/:etatId", etat.findOne);
  
    // Update a Etat with etatId
    app.put("/etat/:etatId", etat.update);
  
    // Delete a Etat with etatId
    app.delete("/etat/:etatId", etat.delete);
  
    // Delete all Etat
    app.delete("/etat", etat.deleteAll);
  };
  