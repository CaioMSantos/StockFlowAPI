const suppliersModel = require('../Models/suppliersModel');

const addSuppliers = async (req, res) => {
    const { name, phone, email, address, city, state, zip_code, country } = req.body;
  
    try {
      await suppliersModel.addSuppliers(name, phone, email, address, city, state, zip_code, country);
      res.status(201).send({ message: 'Supplier registered successfully' });
    } catch (err) {
      console.error('Error registering the Supplier', err);
      res.status(500).send({ message: 'Error registering the Supplier' });
    }
  };

const listAllSuppliers = async (req, res) => {
  try{
    const suppliers = await suppliersModel.listAllSuppliers();
    res.status(200).send(suppliers);
  } catch (err){
    console.error('Error when searching for suppliers', err);
    res.status(500).send({ message: 'Error when searching for suppliers' });
  }
}

const updateSupplier = async (req, res) => {
  const { supplierId, name, phone, email, address, city, state, zip_code, country } = req.body;

  try {
    await suppliersModel.updateSupplier(supplierId, name, phone, email, address, city, state, zip_code, country);
    res.status(201).send({ message: 'Supplier updating successfully' });
  } catch (err) {
    console.error('Error updating supplier', err);
    res.status(500).send({ message: 'Error updating supplier' });
  }
};

const deleteSupplier = async (req, res) => {
  const { supplierId } = req.params;

  try{
    await suppliersModel.deleteSupplier(supplierId);
    res.status(201).send({ message: 'Supplier deleting successfully' });
  } catch (err) {
    console.error('Error deleting supplier', err);
    res.status(500).send({ message: 'Error deleting supplier' });
  }
};

module.exports = {
    addSuppliers,
    listAllSuppliers,
    updateSupplier,
    deleteSupplier
};