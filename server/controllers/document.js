const Document = require('../models/document');

module.exports = {
  documents: async (req, res) => {
    const documents = await Document.find({});
    res.status(200).json(documents);
  },
  newDocument: async (req, res) => {
    document = new Document();
    document.title = req.body.title;
    document.text = req.body.text;
    const documentStorage = await document.save();
    res.status(200).json(documentStorage);
  },

  document: async (req, res) => {
    const { id } = req.params;
    const document = await Document.findById(id);
    res.status(200).json(document);
  },

  updateDocument: async (req, res) => {
    const { id } = req.params;
    const newDocument = req.body;
    const oldDocument = await Document.findByIdAndUpdate(id, newDocument);
    res.status(200).json({ success: true });
  },

  deleteDocument: async (req, res) => {
    const { id } = req.params;
    const newDocument = req.body;
    const oldDocument = await Document.findByIdAndRemove(id, newDocument);
    res.status(200).json({ success: true });
  }
};
