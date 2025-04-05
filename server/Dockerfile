FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
COPY wait-for.sh ./  
RUN chmod +x ./wait-for.sh
EXPOSE 5000
CMD ["./wait-for.sh", "node", "index.js"]
