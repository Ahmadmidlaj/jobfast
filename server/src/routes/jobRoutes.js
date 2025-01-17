import express from "express"
import { searchJobs } from "../controllers/jobController.js";
const router = express.Router();
router.post("/api/search-jobs",searchJobs)   

export default router;
