const fs = require("fs");
const path = require("path");

// ==========================================
// 1. PATH
// ==========================================

// __dirname = current directory of this JS file
const filePath = path.join(__dirname, "example.txt");


// ==========================================
// 2. CREATE / WRITE FILE
// ==========================================

// writeFileSync: Creates file or overwrites existing content
fs.writeFileSync(filePath, "Hello Node.js");

// Async version: preferred for non-blocking operations
fs.writeFile(filePath, "Hello again", (err) => {
    if (err) throw err;
    console.log("File written");
});


// ==========================================
// 3. READ FILE
// ==========================================

// Sync version: blocks execution until completed
const data = fs.readFileSync(filePath, "utf8");
console.log(data);

// Async version: does not block execution
fs.readFile(filePath, "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
});


// ==========================================
// 4. APPEND TO FILE
// ==========================================

// Adds content without removing existing content
fs.appendFileSync(filePath, "\nNew line");


// ==========================================
// 5. DELETE FILE
// ==========================================

// fs.unlinkSync(filePath);
// Async: fs.unlink(filePath, callback);


// ==========================================
// 6. CHECK IF FILE / DIRECTORY EXISTS
// ==========================================

console.log(fs.existsSync(filePath)); // true or false


// ==========================================
// 7. CREATE DIRECTORY
// ==========================================

// recursive: true creates missing parent directories too
fs.mkdirSync("data/logs", { recursive: true });


// ==========================================
// 8. READ DIRECTORY CONTENTS
// ==========================================

const files = fs.readdirSync(__dirname);
console.log(files);


// ==========================================
// 9. FILE INFORMATION
// ==========================================

const stats = fs.statSync(filePath);

console.log(stats.isFile());      // Is it a file?
console.log(stats.isDirectory()); // Is it a directory?
console.log(stats.size);          // Size in bytes
console.log(stats.mtime);         // Last modification time


// ==========================================
// 10. RENAME / MOVE FILE
// ==========================================

// fs.renameSync(oldPath, newPath);
// fs.rename(oldPath, newPath, callback);


// ==========================================
// 11. COPY FILE
// ==========================================

fs.copyFileSync(filePath, path.join(__dirname, "copy.txt"));


// ==========================================
// 12. PROMISE-BASED API (RECOMMENDED)
// ==========================================

const fsPromises = require("fs/promises");

async function fileOperations() {
    try {
        await fsPromises.writeFile(filePath, "Using promises");

        const content = await fsPromises.readFile(filePath, "utf8");
        console.log(content);

        await fsPromises.appendFile(filePath, "\nAppended content");

    } catch (err) {
        console.error("File operation failed:", err.message);
    }
}

fileOperations();


// ==========================================
// IMPORTANT NOTES
// ==========================================

// fs              -> Callback-based and synchronous APIs
// fs/promises     -> Promise-based APIs (async/await)

// Sync methods   -> Block the event loop
// Callback APIs  -> Non-blocking
// Promise APIs   -> Non-blocking

// readFile()     -> Reads entire file into memory
// createReadStream() -> Reads large files in chunks
// createWriteStream() -> Writes data in chunks

// writeFile()    -> Overwrites existing content
// appendFile()   -> Adds content
// unlink()       -> Deletes a file
// mkdir()        -> Creates a directory
// readdir()      -> Lists directory contents
// stat()         -> Gets file metadata
// rename()       -> Renames or moves a file
// copyFile()     -> Copies a file
