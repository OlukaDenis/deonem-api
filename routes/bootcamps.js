const express = require('express');
const {
  getBootcamps, getBootcamp, updateBootcamp, createBootcamp, deleteBootcamp, getBootCampsInRadius,
} = require('../controllers/bootcamps.controller');

const router = express.Router();

router.route('/radius/:zipcode/:distance').get(getBootCampsInRadius);

router.route('/')
  .get(getBootcamps)
  .post(createBootcamp);

router.route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
