import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Replace 'your-repo-name' with your actual repository name
const repoName = 'your-repo-name';

export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`,
});
