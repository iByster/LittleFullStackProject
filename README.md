# LittleFullStackProject

## Setup environment variables

There is and .env.example for frontend and backend in each package.

### Backend

```
// .env file
PORT=3000
```

### Frontend

```
// .env file
EXPO_PUBLIC_API_URL=http://<your-private-ip | localhost>:3000/api
```

## Start backend
```
cd server
```

Build docker image
```
docker build -t server .
```

Start docker image
```
docker run -p 8080:3000 server
```

## Start frontend

```
cd mobile
```

### For Android
```
npm run android
```

### For IOS
```
npm run ios
```

### For web
```
npm run web
```


