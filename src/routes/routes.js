const express = require('express');
const router = express.Router();
const TableData = require('../models/sharpner');  // Import the TableData model

// Route to get all tableData
router.get('/', async (req, res) => {
  try {
    const tableData = await TableData.findAll();  // Use Sequelize to fetch all tableData
    res.json(tableData);
  } catch (error) {
    console.error('Error retrieving tableData:', error);
    res.status(500).send('Error retrieving tableData from the database');
  }
});

// Route to insert a new product
router.post('/', async (req, res) => {
  const { title, price, description, imageUrl } = req.body;
  
  try {
    const newData = await TableData.create({title, price, description, imageUrl});  // Use Sequelize to create a new product
    res.json({ message: 'TableData added successfully', product: newData });
  } catch (error) {
    console.error('Error inserting product:', error);
    res.status(500).send('Error inserting product into the database');
  }
});

// Route to update an existing product
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, price, description, imageUrl  } = req.body;

  try {
    const product = await TableData.findByPk(id);  // Find product by its primary key (ID)

    if (!product) {
      return res.status(404).send('TableData not found');
    }

    // Update the product's details
    product.title = title;
    product.price = price;
    product.description = description;
    product.imageUrl = imageUrl;
    await product.save();  // Save the updated product

    res.json({ message: 'TableData updated successfully', product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send('Error updating product in the database');
  }
});

module.exports = router;
