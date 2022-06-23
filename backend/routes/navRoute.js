const express = require("express");
const router = express.Router();
const navController = require("./../controllers/navController");

router.get("/", navController.home);

router.get("/how-we-work", navController.how_we_work);

router.get("/event-listening", navController.event_listening);

router.get("/contact", navController.contact);

router.post("/register", navController.register);

router.get("/event/:slug", navController.slugData);

router.delete("/event/delete-event/:id", navController.eventDelete);

router.patch("/event/updateEvent/:id", navController.updateData);

module.exports = router;
