const Document = require('../models/document');

function getDocument(req, res) {
  documentId = req.params.id;
  Document.findById(documentId).exec((err, document) => {
    err && console.log(err);
    !document
      ? res.send({ msg: 'Error in the request' })
      : res.send({ document });
  });
}

function getDocuments(req, res) {
  Document.find((err, documents) => {
    err && console.log(err);
    !documents ? res.send({ msg: 'Empty' }) : res.send({ documents });
  });
}

function createDocument(req, res) {
  document = new Document();
  params = req.body;
  document.title = params.title;
  document.text = params.text;

  document.save((err, documentStored) => {
    if (err) {
      res.send({ message: 'Error to save the document' });
    } else {
      if (!documentStored) {
        res.status(400).send({ message: "The document can't be safe" });
      } else {
        res.status(200).send({ document: documentStored });
      }
    }
  });
}

function updateDocument(req, res) {
  var documentId = req.params.id;
  var update = req.body;
  Document.findByIdAndUpdate(documentId, update, (err, documentUpdate) => {
    err && res.status(500).send({ message: 'Ops! there is an error' });
    !documentUpdate
      ? res.status(404).send({ message: "The document can't be updated" })
      : res.status(200).send({ document: documentUpdate });
  });
}

function deleteDocument(req, res) {
  var documentId = req.params.id;
  Document.findByIdAndRemove(documentId, (err, documentRemoved) => {
    err && res.send({ message: 'there is an error to delete the document' });
    !documentRemoved
      ? res.send({ message: "The document can't be deleted" })
      : res.send({ document: documentRemoved });
  });
}
module.exports = {
  getDocument,
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument
};
