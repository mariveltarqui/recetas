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

// - 5. obtener una receta por su ID
rutas.get('/receta/:id', async (req, res) => {
    try {
        const receta = await RecetaModel.findById(req.params.id);
        if (!receta)
            return res.status(404).json({ mensaje : 'Receta no encontrada!!!'});
        else 
            return res.json(receta);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

//endpoint 6 - obtener recetas por un ingrediente especifico
rutas.get('/recetaPorIngrediente/:ingrediente', async (req, res) => {
    try {
        const recetaIngrediente = await RecetaModel.find({ ingredientes: new RegExp(req.params.ingrediente, 'i')});
        return res.json(recetaIngrediente);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

// endpoint 7 - eliminar todas las recetas
rutas.delete('/eliminarTodos', async (req, res) => {
    try {
        await RecetaModel.deleteMany({});
        return res.json({mensaje: "Todas las recetas han sido eliminadas"});
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

// endpoint8  - contar el numero total de recetas
rutas.get('/totalRecetas', async (req, res) => {
    try {
        const total = await RecetaModel.countDocuments();
        return res.json({totalReceta: total });
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

//  endpoint9- obtener recetas ordenadas por nombre ascendente
// query.sort({ field: 'asc', test: -1 });
rutas.get('/ordenarRecetas', async (req, res) => {
    try {
       const recetasOrdenadas = await RecetaModel.find().sort({ nombre: -1});
       res.status(200).json(recetasOrdenadas);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

// endpoint10- obtener recetas por cantiad

rutas.get('/recetaPoCantidad/:cantidad', async (req, res) => {
    try {
       const recetas = await RecetaModel.find({ porciones: req.params.cantidad});
       res.status(200).json(recetas);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});
module.exports = rutas;
