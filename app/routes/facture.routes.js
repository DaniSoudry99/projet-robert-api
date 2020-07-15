module.exports = app => {
    const facture = require("../controllers/facture.controller.js");
  
    // Create a new Facture
    app.post("/facture", facture.create);
    
    // Retrieve all Facture
    app.get("/facture", facture.findAll);

    app.get("/factureInfo", facture.findInfo);

    app.get("/laFactureInfo/:factureId", facture.findInfoFacture);

    app.get("/laFactureInfo2/:numeroFacture", facture.findInfoLaFacture);

    app.get("/factureAFaire", facture.factureAFaire);

    app.get("/factureMax", facture.factureMax);
  
    // Retrieve a single Facture with factureId
    app.get("/facture/:factureId", facture.findOne);
  
    // Update a Facture with factureId
    app.put("/facture/:factureId", facture.update);
  
    // Delete a Facture with factureId
    app.delete("/facture/:factureId", facture.delete);
  
    // Delete all Facture
    app.delete("/facture", facture.deleteAll);
  };
  