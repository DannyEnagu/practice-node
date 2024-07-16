const express = require('express');
const router = express.Router();
const dbConnect = require('../db');

router.get('/todos', async (req, res, next) => {
	// Get Todos
	const db = await dbConnect();
	const todos = await db.collection('todo').find({}).toArray();
	console.log(todos)
	
//	res.json({ todos });
});

router.post('/todos', (req, res, next) => {
  // post placeholder
});

router.delete('/todos/:id', (req, res, next) => {
  // delete placeholder
});

module.exports = router;
