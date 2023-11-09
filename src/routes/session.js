/**
 * session endpoint that just returns customer id
 * not part of spec, but nice to have
 * 
 * @author Alex Jurgens
 */
import { Router } from 'express';

const router = Router();

router.get("/session", (req, res) => {
    return res.send(req.context.customers.users[req.context.me.id]);
});

export default router;