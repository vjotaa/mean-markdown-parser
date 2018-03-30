const express = require('express');
const DocumentController = require('../controllers/document_controller');
const document = express.Router();

document.get('/document/:id', DocumentController.getDocument);
document.get('/documents/', DocumentController.getDocuments);
document.post('/create-document/', DocumentController.createDocument);
document.put('/update-document/:id', DocumentController.updateDocument);
document.delete('/delete-document/:id', DocumentController.deleteDocument);

module.exports = document;
