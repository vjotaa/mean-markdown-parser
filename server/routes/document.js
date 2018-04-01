const router = require('express-promise-router')();
const DocumentController = require('../controllers/document');

router.get('/documents/', DocumentController.documents);
router.get('/document/:id', DocumentController.document);
router.post('/create-document/', DocumentController.newDocument);
router.put('/update-document/:id', DocumentController.updateDocument);
router.delete('/delete-document/:id', DocumentController.deleteDocument);

module.exports = router;
