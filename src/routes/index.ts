import { Router, Request, Response } from 'express';
const router = Router();

router.get('', (req: Request, res: Response) => {
  res.send('Main path API');
});

// router.use("/account", userAccountRoutes);
// router.use("/storage", storageUsageRoutes);
// router.use("/jira", jiraRoutes);
// router.use("/prpo", prpoRoutes);
// router.use("/crm", crmRoutes);
// router.use("/mail", mailRoutes);

export default router;
