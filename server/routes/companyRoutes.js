import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  getAllCompanies,
  getCompanyById,
  getCompanyGap,
  getAllCompanyGaps,
} from "../controllers/companyController.js";

const router = Router();

router.get("/", protectRoute, getAllCompanies);
router.get("/gaps", protectRoute, getAllCompanyGaps);
router.get("/:id/gap", protectRoute, getCompanyGap);
router.get("/:id", protectRoute, getCompanyById);

export default router;
