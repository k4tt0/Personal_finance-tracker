import { chmod } from 'fs/promises';
import { join } from 'path';

const vitePath = join(process.cwd(), 'node_modules', '.bin', 'vite');

chmod(vitePath, 0o755)
  .then(() => {
    console.log('Permissions set for Vite binary');
  })
  .catch((err) => {
    console.error('Error setting permissions for Vite binary:', err);
  });