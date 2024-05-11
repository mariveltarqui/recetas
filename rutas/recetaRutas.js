const express = require('express');
const rutas = express.Router();
const RecetaModel = require('../models/Receta');

//endpoint traer todas las recetas
rutas.get('/traerRecetas', async (req, res) => {
    try  {
       const receta = await  RecetaModel.find();
       res.json(receta);
    } catch (error){
        res.status(500).json({mensaje: error.message});
    }
});

//endpoint 2 crear
rutas.post('/crear',async (req, res)=> {
const receta =new RecetaModel({
    nombre: req.body.nombre,
    ingredientes: req.body.ingredientes,
    porciones: req.body.porciones
})

try {
    const nuevaRecetas = await receta.save();
    res.status(201).json(nuevaRecetas);
}catch (error) {
    res.status(400).json({mensaje: error.message})
}

});

//endpoint 3 editar
rutas.put('/editar/:id', async (req, res) => {
    try {
        const recetaEditada = await RecetaModel.findByIdAndUpdate(req.params.id, req.body, {new : true});
        if (!recetaEditada)
            return res.status(404).json({ mesaje : 'Receta no encontrada!!!'});
        else
            return res.status(201).json(recetaEditada);
    } catch (error){
        res.status(400).json({ mensaje : error.mensaje})
    }
})

//endpoint 4 eliminar
rutas.delete('/eliminar/:id', async (req, res) =>{
    try {
        const recetaEliminada = await RecetaModel.findByIdAndDelete(req.params.id);
        if (!recetaEliminada)
            return res.status(404).json({ mesaje : 'Receta no encontrada!!!'});
        else
            return res.json({mesaje : 'Receta eliminada'});
    } 
    catch (error){
        res.status(500).json({ mensaje : error.mensaje})
    }

})

module.exports = rutas;
