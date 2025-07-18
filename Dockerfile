# Use a lightweight web server image (nginx) to serve static files
FROM nginx:alpine

# Copy your static site files to the nginx html directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
