const express = require('express')
const connectDb = require('./config/dbConfig')
const envFile = require('dotenv')
const cors = require("cors")
const morgan = require("morgan");
const path = require('path');
const fs = require('fs');
const productRoutes = require("./routes/product");
const productAdminRoutes = require("./routes/productAdminRoutes");
envFile.config()

const app = express()
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/", productRoutes);
app.use("/api/admin/", productAdminRoutes);

const buildPath = path.join(__dirname, '../shopping/dist')
app.use(express.static(buildPath))

// 3. Catch-all route to handle React Router paths
app.get((req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'))
});

if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads')
}

const MONGODB_URI = process.env.MONGODB_URI || ""

try{
    connectDb(MONGODB_URI)
} catch(err){
    console.log(err)
    process.exit(1)
}
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
