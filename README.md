# Getting Started with Create React App

![Test CI](https://github.com/213OGD/213OGD-React/workflows/Test%20CI/badge.svg?branch=dev)
![Build and push on Docker Hub](https://github.com/213OGD/213OGD-React/workflows/Build%20and%20push%20on%20Docker%20Hub/badge.svg?branch=dev)

## Démarrer en dev

### 1. Rendre le fichier start_dev.sh executable

```sh 
chmod +x start_dev.sh
```
OU
```sh 
chmod 755 start_dev.sh
``` 

### 2. Lancer le projet docker-compose avec la cmd

```sh
sh ./start_dev.sh
```

## Démarrer en prod

### 1. Rendre le fichier start_prod.sh executable

```sh 
chmod +x start_prod.sh
```
OU
```sh 
chmod 755 start_prod.sh
``` 

### 2. Préciser le port & lancer le projet docker-compose avec la cmd

```sh
PORT=*PORT* sh ./start_prod.sh
```
