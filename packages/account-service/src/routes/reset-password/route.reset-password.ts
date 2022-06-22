import express from "express"
import multer from 'multer'


const router = express.Router()
const upload = multer()


/// TODO: reset password
router.post('/reset-password', upload.none(), async (req, res) => {
	return res.status(501).send('Not implemented')
});


export = router