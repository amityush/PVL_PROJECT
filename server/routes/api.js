const express = require('express');
const router = express.Router();
const People = require('../model/people');

// Save data to MongoDB
router.post('/saveData', async (req, res) => {
  const { boy, girl, male, female } = req.body;
  console.log('Received data:', { boy, girl, male, female });

  try {
    const newData = new People({ boy, girl, male, female });
    await newData.save();
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving data to the database' });
  }
});

// Create a new endpoint to calculate and return the totals
router.get('/getTotals', async (req, res) => {
  try {
    const data = await People.find({});
    let totalPeople = 0;
    let totalBoys = 0;
    let totalGirls = 0;
    let totalMales = 0;
    let totalFemales = 0;

    for (const record of data) {
      totalPeople += record.boy + record.girl + record.male + record.female;
      totalBoys += record.boy;
      totalGirls += record.girl;
      totalMales += record.male;
      totalFemales += record.female;
    }

    const totals = {
      totalPeople,
      totalBoys,
      totalGirls,
      totalMales,
      totalFemales,
    };

    res.status(200).json(totals);
  } catch (error) {
    res.status(500).json({ error: 'Error calculating totals' });
  }
});


module.exports = router;
