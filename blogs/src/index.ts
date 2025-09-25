import express from "express";
import {blogsRouter} from "./routes/blogs/blogs-router";
import {runDb} from "./db/db";
import {clearDatabaseRouter} from "./routes/clearDatabase-router";
import {postsRouter} from "./routes/posts/posts-router";
import {usersRouter} from "./routes/users/userRoutes";
import {authRouter} from "./routes/auth/authRoutes";
// import {commentsRouter} from "./routes/comments/comments-router";

require('dotenv').config()

export const app = express()
const port = process.env.PORT || 3000

// const parserMiddleware = bodyParser({})
// app.use(parserMiddleware)

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/users', usersRouter)
app.use('/testing', clearDatabaseRouter)
app.use('/auth', authRouter)
// app.use('/comments' , commentsRouter)

const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()

export default app
