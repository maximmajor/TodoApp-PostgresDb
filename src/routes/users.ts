import express from "express";
const router = express.Router();

/* GET users listing. */
router.get("/", function (req: any, res: express.Response, _next) {
  res.send("respond with a resource");
});

export default router;