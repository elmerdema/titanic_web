# Stage 1: Build
FROM node:18-alpine3.17 AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . /app

# Build the application
RUN yarn build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the build output to the Nginx html directory
COPY --from=build /app/dist /var/www/html

# Copy your custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
