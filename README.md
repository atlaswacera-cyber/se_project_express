# WTWR (What to Wear?): Back End

This project provides the Express API and MongoDB database for the WTWR
application. It stores users and clothing items, supports creating and deleting
items, and allows users to like or unlike clothing items.

## Technologies

- Node.js and Express
- MongoDB and Mongoose
- REST API routing
- Schema validation with Validator
- ESLint, Airbnb style rules, and Prettier

## Live Deployment

Frontend: [https://wtwr-atlas.chickenkiller.com](https://wtwr-atlas.chickenkiller.com)

API: [https://api.wtwr-atlas.chickenkiller.com](https://api.wtwr-atlas.chickenkiller.com)

## Repositories

Frontend repository: [https://github.com/atlaswacera-cyber/se_project_react](https://github.com/atlaswacera-cyber/se_project_react)

Backend repository: [https://github.com/atlaswacera-cyber/se_project_express](https://github.com/atlaswacera-cyber/se_project_express)

## Running the Project Locally

Make sure MongoDB is running locally. Create a `.env` file with a `JWT_SECRET`
value before starting the server.

```bash
npm install
npm run dev
```

The API runs at `http://localhost:3001`.

## Scripts

`npm run start` launches the server on `localhost:3001`.

`npm run dev` launches the server with automatic restarts.

`npm run lint` checks the project with ESLint.

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12

## Project Pitch Video

I recorded the project pitch in Loom. Loom did not allow me to download the video, so I added public Loom links directly to the README instead of Google Drive links.

Check out:

[Video 1](https://www.loom.com/share/1c142c3d2d1d40a2a9f557112c3a9f23)

[Video 2](https://www.loom.com/share/bf50a80384d04120972b7828c221514f)

[Video 3](https://www.loom.com/share/de17160ed7494f679aae6d2968b7d7e2)

In these videos, I describe my project and some challenges I faced while building it.
