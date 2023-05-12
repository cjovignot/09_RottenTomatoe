#!/bin/bash
cd src/app/api/
set -o allexport
# source .env
set +o allexport
gnome-terminal --title="Users" -- node-dev users.js

set -o allexport
# source .env
set +o allexport
gnome-terminal --title="Movies" -- node-dev movies.js

set -o allexport
# source .env
set +o allexport
gnome-terminal --title="Auth" -- node-dev auth.js


npm run dev