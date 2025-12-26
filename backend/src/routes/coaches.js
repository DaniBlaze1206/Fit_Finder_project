const express = require("express");
const controller = require("../controllers/coachesController");

const router = express.Router();

router.get("/", controller.getAllCoaches);
router.get("/:id", controller.getCoachById);
router.post("/", controller.createCoach);
router.put("/:id", controller.updateCoach);
router.delete("/:id", controller.deleteCoach);

module.exports = router;
