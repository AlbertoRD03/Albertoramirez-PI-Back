const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exercise.controller');

router.get('/', exerciseController.getAllExercises);

module.exports = router;