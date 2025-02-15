# PolarstepsTrip

A simple service for redirecting a custom URL to Polarsteps.
It shows in order:
- First: The current trip
- Otherwise: The next trip
- Otherwise: The last trip

### How to use

1. Have node 22 `nvm install 22 && nvm use 22`
2. Install dependencies `npm install`
3. run `npm start`

### How to deploy on a VPS

1. Copy and paste the compose.yml (with Traefik) in your server.
2. Change the traefik labels with your domain and username.
3. Run `docker-compose up -d` in the same directory as the compose.yml.
4. Done! You can now access your service on your domain.