import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react';

    // Replace 'your-repo-name' with your actual repository name
    const repoName = 'todolist-spartacus';

    export default defineConfig({
      plugins: [react()],
      base: `/${repoName}/`,
    });
