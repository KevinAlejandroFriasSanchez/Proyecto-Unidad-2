const express = require('express');
const _ = require('underscore');
const app = express();
const Categoria = require ('../models/categoria');

app.get('/categoria', (req,res) =>{
let desde = req.query.desde || 0;
let hasta = req.query.hasta || 5;

Categoria.find({})
.skip(Number(desde))
.limit(Number(hasta))
.populate('usuario', 'nombre email ')
.exec ((err, categorias) =>{
    if (err) {
        return res.status(400).json({
            ok: false,
            msg: 'Ocurrio un error al listar las categorias',
            err
        });
    }
    res.json({
        ok: true,
        msj: 'Categorias listadas con exito',
        conteo: categorias.length,
        categorias
    });
});
});

app.post('/categoria', (req, res) =>{
    let body = req.body;
    let cat = new Categoria({
            descripcion: body.descripcion,
            usuario: body.usuario

    });
    cat.save((err, catDB) =>{
        if(err) {
            return res.status(400).json({
                ok: false,
                msj: 'Error al insertar categoria',
                err
            });
        }
   
         res.json({
            ok: true,
            msj: 'Categoria insertada con exito',
            catDB
        });
  
         });
    });
module.exports = app;
