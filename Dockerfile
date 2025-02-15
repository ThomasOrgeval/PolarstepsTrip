FROM node:22

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY index.js ./index.js

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "index.js"]