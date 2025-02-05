import {Router} from 'express';
import tperfcode from '../model/tperfcode.js';
import tperftest from '../model/tperftest.js';
 
const router = Router() ;

router.get('/', async function (req, res, next) {
    const rdata = await tperfcode.tperflist() ;
    res.json(rdata) ;
});

router.get('/perfde_list', async function (req, res, next) {
    // console.log("req.query.asisdt : " + req.query.asisdt);
    // console.log("req.query.tobedt : " + req.query.tobedt);

    const rdata = await tperftest.tperfdelist(req) ;
    res.json(rdata) ;
});

export default router;
