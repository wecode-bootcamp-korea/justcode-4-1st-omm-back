import { createServer } from 'http'
import express, { json } from 'express'
// const { PrismaClient } = require('@prisma/client')
import routes from './routes'

// const prisma = new PrismaClient()

const app = express()

app.use(json())
app.use(routes)

const server = createServer(app)

const start = async () => {
    try {
        server.listen(8000, () => console.log('Server is listening on 8000'))
    } catch (err) {
        console.log(err)
        await prisma.$disconnect()
    }
}

start()
