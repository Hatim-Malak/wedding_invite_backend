import express from "express";
import { addConfirmedGuest, addGuest, showAllGuest, showSpecificGuest } from "../controllers/guest.controller.js";

const router =  express.Router();

router.get("/getAll",showAllGuest)
router.post("/addGuest",addGuest)
router.put("/confirm",addConfirmedGuest)
router.get("/specific/:id",showSpecificGuest)

export default router;