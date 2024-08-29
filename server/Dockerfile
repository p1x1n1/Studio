FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

# Переустановка нативных модулей для текущей архитектуры
RUN npm rebuild bcrypt --build-from-source
RUN npm install -g nodemon
COPY . .

ENV PORT=5000

EXPOSE 5000

CMD ["npm", "run", "dev"]
