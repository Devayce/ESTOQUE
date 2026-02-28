import express from 'express';
import apiRoutes from './routes'; // Import the main router

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// --- API Routes ---
app.use('/api', apiRoutes); // Use the main router for all /api paths

// --- Server Initialization ---
app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});

export default app;