
  # SaaS de Governança de Dados

  This is a code bundle for SaaS de Governança de Dados. The original project is available at https://www.figma.com/design/BXze6CHO6ip5LKFDXuGMSc/SaaS-de-Governan%C3%A7a-de-Dados.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  Run `npm run build` to generate the static production bundle in `dist/`.

  ## Deploy via Coolify

  This is a static front-end (Vite SPA). It ships with a multi-stage
  `Dockerfile` that builds the bundle and serves it with nginx, plus an
  `nginx.conf` that falls back to `index.html` so client-side routing works.

  1. In Coolify, create a new resource from this Git repository.
  2. Choose the **Dockerfile** build pack (it is auto-detected from the repo root).
  3. Keep **Ports Exposes** set to `80`.
  4. Attach your domain and deploy.

  To test the production image locally:

  ```bash
  docker build -t aether-frontend .
  docker run --rm -p 8080:80 aether-frontend
  # open http://localhost:8080
  ```
  