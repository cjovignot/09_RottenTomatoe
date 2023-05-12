#!/bin/bash
cd src/app/api/
npm install
set -o allexport
set +o allexport
gnome-terminal --title="Users" -- node-dev users.js

set -o allexport
set +o allexport
gnome-terminal --title="Movies" -- node-dev movies.js

set -o allexport
set +o allexport
gnome-terminal --title="Auth" -- node-dev auth.js

npm install
npm run dev