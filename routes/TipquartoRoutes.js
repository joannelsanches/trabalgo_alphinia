import express from 'express';
const router = express.Router();
import TipquartoController from '../controllers/TipquartoController.js'
const controle = new TipquartoController();
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const caminhobase = 'tipquarto/'

router.get('/' + caminhobase + 'add', controle.openAdd)
router.post('/' + caminhobase + 'add', upload.single('img'), controle.add)
router.get('/' + caminhobase + 'lst', controle.list)
router.post('/' + caminhobase + 'lst', controle.find)
router.get('/' + caminhobase + 'del/:id', controle.del)
router.get('/' + caminhobase + 'edt/:id', controle.openEdt)
router.post('/' + caminhobase + 'edt/:id', upload.single('img'), controle.edt)
export default router;
