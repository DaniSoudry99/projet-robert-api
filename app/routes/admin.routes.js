module.exports = app => {
    const admin = require("../controllers/admin.controller.js");
  
    // Create a new Admin
    app.post("/admin", admin.create);
    
    // Retrieve all Admin
    app.get("/admin", admin.findAll);
  
    // Retrieve a single Admin with adminId
    app.get("/admin/:adminId", admin.findOne);
  
    // Update a Admin with adminId
    app.put("/admin/:adminId", admin.update);
  
    // Delete a Admin with adminId
    app.delete("/admin/:adminId", admin.delete);
  
    // Create a new Admin
    app.delete("/admin", admin.deleteAll);
  };
  