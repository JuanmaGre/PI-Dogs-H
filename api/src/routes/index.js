const { Router } = require('express');
const router = Router();
const express = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dog = require( './dog' );
const dogs = require( './dogs' );
const temperaments = require( './temperaments' );

router.use(express.json());

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use( '/dogs', dogs );
router.use( '/temperaments', temperaments );
router.use( '/dog', dog );


module.exports = router;