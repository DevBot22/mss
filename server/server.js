import express from 'express'
import  dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'

dotenv.config()

const app = express()

//Middleware
app.use(cors())
app.use(express.json())

//Route
app.get('/', (req, res) => {
    res.send('MSS API is running ...')
})

//MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ MongoDB connected')
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
         console.log(`🚀 Express server running on http://localhost:${PORT}`);
    })
})
.catch((err) => console.error('❌ MongoDB connection error:', err));

export default app