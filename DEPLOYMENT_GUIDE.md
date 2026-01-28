# Deployment Guide for Saqify Art Studio

Your Next.js project is ready for deployment! The easiest and best way to deploy a Next.js application is using **Vercel** (the creators of Next.js).

## Option 1: Deploy with Vercel (Recommended)

### Prerequisites
- A [GitHub](https://github.com/) account.
- A [Vercel](https://vercel.com/) account (you can sign up using GitHub).

### Steps
1.  **Push your code to GitHub**
    - Create a new repository on GitHub (e.g., `saqify-art-studio`).
    - Open your terminal in this project folder and run:
      ```powershell
      git add .
      git commit -m "Ready for deployment"
      git branch -M main
      git remote add origin https://github.com/YOUR_USERNAME/saqify-art-studio.git
      git push -u origin main
      ```
      *(Replace `YOUR_USERNAME` with your actual GitHub username)*

2.  **Deploy on Vercel**
    - Go to [Vercel Dashboard](https://vercel.com/dashboard).
    - Click **"Add New..."** -> **"Project"**.
    - Select your `saqify-art-studio` repository from the list.
    - Click **"Deploy"**.
    - Vercel will automatically build and deploy your site. It usually takes less than a minute.

3.  **Your site is live!**
    - Vercel will give you a URL (e.g., `saqify-art-studio.vercel.app`) that you can share with the world.

---

## Option 2: Static Export (For hosting on any server)

If you have a cPanel, shared hosting, or want to host it as static files:

1.  Open `next.config.mjs` and add `output: 'export'`:
    ```javascript
    const nextConfig = {
      output: 'export',
      // ... other config
    };
    export default nextConfig;
    ```
2.  Run the build command:
    ```powershell
    npm run build
    ```
3.  This will create an `out` folder.
4.  Upload the contents of the `out` folder to your server (e.g., `public_html`).

*Note: Some dynamic features like API routes (your order form) will NOT work with static export. You would need a separate backend or use a service like Formspree for forms if you choose this method.*

**Therefore, Option 1 (Vercel) is highly recommended as it supports your API routes and forms out of the box.**
