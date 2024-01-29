# SOFTTEK CHALLENGUE

Desarrollado por Danny Salazar

# Requirements
- [Node.js 20.11.0 with npm](https://nodejs.org/en/download/releases/)


# Offline mode
    npm run dev


# Testing
    npm run test


# Deploy
    1. Correr comando: npm run install
    1. Colocar credenciales AWS (cuenta con permiso de administrador) en un archivo .env
        AWS_ACCESS_KEY_ID=xxxxx
        AWS_SECRET_ACCESS_KEY=xxxx
    2. npm run deploy


# model_x
    Se ha creado una clase Task que requiere los campos title y description para
    su creación y edición en formato json

    {
        "title": "Softtek",
        "description": "Softtek challengue"
    }
