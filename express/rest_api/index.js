const express = require('express');
const fs = require('fs');
const { parse } = require('csv-parse/sync')
const j2c = require('json2csv')

const PORT = 8000;
const FILE = './data.csv';
const j2c_parser = new j2c.Parser();

function getUsers(){
  try {
  // Read the entire file content as a string
  const fileContent = fs.readFileSync(FILE, 'utf8');

  // Parse the CSV content synchronously
  const records = parse(fileContent, {
    columns: true,           // Automatically treats the first row as headers
    skip_empty_lines: true,  // Prevents throwing errors on empty lines
    trim: true               // Removes whitespace from fields
  });

  return records;
  } 
  catch (error) {
    console.error("Error reading or parsing CSV file:", error);
    throw error;
  }
}

function addUser(data) {
  try {
    const fileExists = fs.existsSync(FILE);
    const hasData = fileExists && fs.statSync(FILE).size > 0;
    
    const parser = new j2c.Parser({
      fields: ['id', 'first_name', 'last_name', 'email', 'gender', 'ip_address'],
      header: !hasData
    });

    const csv = parser.parse([data]);

    fs.appendFileSync(FILE, csv + '\n');

  } catch (error) {
    console.error("Error appending user:", error);
    throw error;
  }
}

function toCsv(data){
 try{
   const csv = j2c_parser.parse(data);
   return csv;
 }
 catch(error){
    console.error("Error reading or parsing CSV file:", error);
    throw error;
  }
}

function saveUsers(records) {
  const csv = records.length
    ? toCsv(records)
    : 'id,first_name,last_name,email,gender,ip_address';

  fs.writeFileSync(FILE, csv + '\n');
}


app = express();

app.use(express.json()); // parse incoming request with json payloads
app.use(express.urlencoded({ extended: true })); // Parses incoming requests with URL-encoded payloads (HTML forms)


app.get('/', (req, res) => {
  res.send('Homepage')
});

app.get('/users', (req, res) => {
  try{
    // get all users and send back the json
    records = getUsers();
    res.json(records);
  }
  catch(error){
    console.log(`Error: ${error}`);
    throw error;
  }
});

app.get('/users/:id', (req, res) => {
  try{
    records = getUsers();
    userId = req.params.id;
    res.json(
      records.find(
        record => record.id === userId
      )
    );
  }
  catch(error){
    console.log(`Error: ${error}`);
    throw error;
  }
});

app.post('/users', (req, res) => {
  try {
    const userData = req.body;

    addUser(userData);

    res.status(201).json({
      message: 'User created successfully',
      user: userData
    });

  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ error: 'Failed to save user' });
  }
});

app.put('/users/:id', (req, res) => {
  const records = getUsers();
  const userId = req.params.id;

  const index = records.findIndex(user => user.id === userId);

  if (index === -1)
    return res.status(404).json({ error: 'User not found' });

  records[index] = { ...req.body, id: userId };

  saveUsers(records);

  res.json({ message: 'User replaced', user: records[index] });
});

app.patch('/users/:id', (req, res) => {
  const records = getUsers();
  const userId = req.params.id;

  const index = records.findIndex(user => user.id === userId);

  if (index === -1)
    return res.status(404).json({ error: 'User not found' });

  records[index] = { ...records[index], ...req.body };

  saveUsers(records);

  res.json({ message: 'User updated', user: records[index] });
});

app.delete('/users/:id', (req, res) => {
  const records = getUsers();
  const userId = req.params.id;

  const filteredRecords = records.filter(user => user.id !== userId);

  if (filteredRecords.length === records.length)
    return res.status(404).json({ error: 'User not found' });

  saveUsers(filteredRecords);

  res.json({ message: 'User deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
});

