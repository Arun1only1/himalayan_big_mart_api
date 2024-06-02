import express from "express";
import connectDB from "./db.connect.js";
import productRoutes from "./product/product.routes.js";
import userRoutes from "./user/user.routes.js";

const app = express();

// to make app understand json
app.use(express.json());

// db connection
connectDB();

// register routes
app.use(productRoutes);
app.use(userRoutes);

// network port and server
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
