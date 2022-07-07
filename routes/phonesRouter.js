const { Router } = require('express');
const { phoneController } = require('../controllers');
const paginate = require('../middleware/paginate');

const phonesRouter = Router();

// '/api/phones?page=1&results=5&color=blue' => req.query
phonesRouter.get('/', paginate, phoneController.getPhones);

module.exports = phonesRouter;
