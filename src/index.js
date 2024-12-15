require("dotenv").config(); // Load environment variables
const app = require("./app");
const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
