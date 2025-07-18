FROM alpine:latest

# Install curl (or anything else needed inside the script)
RUN apk add --no-cache curl

# Copy the entrypoint script from your repo into the container
COPY /entrypoint.sh /entrypoint.sh

# Make it executable
RUN chmod +x /entrypoint.sh

# Set it as the default command
ENTRYPOINT ["/entrypoint.sh"]