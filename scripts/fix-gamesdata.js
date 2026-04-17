const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'lib', 'gamesData.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Remove all instances of , region: "Global"
content = content.replace(/, region: "Global"/g, '');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Fixed gamesData.ts');
