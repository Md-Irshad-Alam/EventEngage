const Record = require('../Model/Record');

// Add a record
const addRecord = async (req, res) => {
  try {
    const { title, description, images } = req.body;

    const record = new Record({
      title,
      description,
      images,
    });

    await record.save();

    res.status(201).json(record);
  } catch (error) {
    console.error('Error adding record:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createRecord = async (req, res) => {
  try {
    const { title, description } = req.body;
    const images = [];

    // Check if there are any uploaded files
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        images.push(file.path);
      });
    }

    // Create a new record
    const newRecord = new Record({
      title,
      description,
      images,
    });

    // Save the record to the database
    await newRecord.save();

    res.status(201).json(newRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a record
const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, images } = req.body;

    const record = await Record.findByIdAndUpdate(
      id,
      {
        title,
        description,
        images,
      },
      { new: true }
    );

    res.status(200).json(record);
  } catch (error) {
    console.error('Error updating record:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a record
const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;

    await Record.findByIdAndDelete(id);

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting record:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  addRecord,
  updateRecord,
  deleteRecord,
  createRecord
};
