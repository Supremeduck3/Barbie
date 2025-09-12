import express from "express";
import {getAllbarbies,getBarbieByid, createBarbie,deleteBarbie} from "../controllers/barbieControllers.js"

const router = express.Router();

router.get("/", getAllbarbies);
router.get("/:id", getBarbieByid);
router.post("/", createBarbie);
router.delete("/:id",deleteBarbie)

export default router