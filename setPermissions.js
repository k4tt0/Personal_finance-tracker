const fs = require('fs');
const path = require('path');

const vitePath = path.join(__dirname, 'node_modules', '.bin', 'vite');

fs.chmod(vitePath, 0o755, (err) => {
  if (err) {
    console.error('Error setting permissions for Vite binary:', err);
  } else {
    console.log('Permissions set for Vite binary');
  }
});