# 1. Using an official Node.js runtime as the base image
FROM node:20

# 2. Setting the working directory inside the container
WORKDIR /app

# 3. Coping package.json
COPY package*.json ./

# 4. Installing dependencies
RUN npm install

# 5. Copying the rest of your project files
COPY . .

# 6. Compiling the contracts
RUN npm run compile

# 7. Command to deploy the contracts as specified in scripts inside package.json
CMD ["npm", "run", "deploy"]