const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/userRoutes');
const gymRoutes = require('./src/routes/gymRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');
const reservationRoutes = require('./src/routes/reservationRoutes');
const authenticationRoutes = require('./src/routes/authRoutes');
const coachesRouter = require("./src/routes/coaches");

dotenv.config();


const app = express();


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
	res.send("FitFinder is running... ");
});



app.use('/users', userRoutes);
app.use('/gyms', gymRoutes);
app.use('/reviews', reviewRoutes);
app.use('/reservation', reservationRoutes);
app.use('/auth', authenticationRoutes);
app.use("/coaches", coachesRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
})