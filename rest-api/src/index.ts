import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

// Test route
app.get('/', (req, res) => {
    try {
        res.status(200).send({ message: 'API is working!' })
    } catch (error) {
        res.status(500).send({ message: 'API server error!' })
    }
})

// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: 'Server Error!' })
    }
})

// Get all posts
app.get('/feed', async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            where: { published: true },
            include: { author: true },
        })
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ error: 'Server Error!' })
    }
})

// Get Post by ID
app.get('/post/:id', async (req, res) => {
    try {
        const { id } = req.params
        const post = await prisma.post.findUnique({
            where: { id: Number(id) },
        })
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ error: 'Server Error!' })
    }
})

// Create a new user
app.post('/user', async (req, res) => {
    try {
        const { name, email } = req.body
        const user = await prisma.user.create({
            data: { name, email },
        })
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ error: 'Server Error!' })
    }
})

// Create a new post
app.post('/post', async (req, res) => {
    try {
        const { title, content, authorEmail } = req.body
        const post = await prisma.post.create({
            data: {
                title,
                content,
                published: false,
                author: { connect: { email: authorEmail } },
            },
        })
        res.status(201).json(post)
    } catch (error) {
        res.status(500).json({ error: 'Server Error!' })
    }
})

// Update a post
app.put('post/publish/:id', async (req, res) => {
    try {
        const { id } = req.params
        const post = await prisma.post.update({
            where: { id: Number(id) },
            data: { published: true },
        })
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ error: 'Server Error!' })
    }
})

// Delete a post
app.delete('/post/:id', async (req, res) => {
    try {
        const { id } = req.params
        const post = await prisma.post.delete({
            where: { id: Number(id) },
        })
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ error: 'Server Error!' })
    }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log('REST API server ready at: http://localhost:' + PORT),
)