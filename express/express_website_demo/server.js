const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve every file inside the public directory.
// Example: /style.css -> public/style.css
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, 'localhost', () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
