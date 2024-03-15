
const Admin= require('../models/Admin');
const express = require('express');
const router = require('express').Router();

router.post('/login', (req, res) => {
  res.render('admin/login'); // This will render 'views/admin/login.ejs'
});

router.get('/add-product', (req, res) => {
  res.render('adminp/roducts/create/new/'); // This will render 'views/admin/addProduct.ejs'
});
router.get('/add-category', (req, res) => {
  res.render('category/create/new'); // This will render 'views/admin/addProduct.ejs'
});
module.exports = router;
