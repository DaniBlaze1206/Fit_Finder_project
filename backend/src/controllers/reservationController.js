const fs = require('fs').promises;
const path = require('path');

const reservationFilePath = path.join(__dirname, '../data/reservations.json');
const gymFilePath = path.join(__dirname, '../data/gyms.json');

async function readReservations() {
  try {
    const text = await fs.readFile(reservationFilePath, 'utf8');
    return text ? JSON.parse(text) : [];
  } catch (error) {
    console.error("Error reading reservations:", error);
    return [];
  }
}

async function writeReservations(reservations) {
  await fs.writeFile(reservationFilePath, JSON.stringify(reservations, null, 2));
}

async function readGyms() {
  try {
    const text = await fs.readFile(gymFilePath, "utf8");
    return text ? JSON.parse(text) : [];
  } catch (error) {
    return [];
  }
}



const createReservation = async (req, res) => {
  try {
    const { gymId, date, time } = req.body;

    if (!gymId || !date || !time) {
      return res.status(400).json({ 
        message: "gymId, date, and time are required" 
      });
    }

    const gyms = await readGyms();
    const gym = gyms.find(g => g.id === Number(gymId));

    if (!gym) {
      return res.status(404).json({ message: "Gym not found" });
    }

    const reservations = await readReservations();

    const newId = reservations.length 
      ? Math.max(...reservations.map(r => r.id || 0)) + 1 
      : 1;

    const userId = req.user.id;

    const newReservation = {
      id: newId,
      userId,
      gymId: Number(gymId),
      date,
      time,
      createdAt: new Date().toISOString()
    };

    reservations.push(newReservation);
    await writeReservations(reservations);

    res.status(201).json({
      message: "Reservation created successfully",
      reservation: newReservation
    });

  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ message: "Error creating reservation" });
  }
};



const getMyReservations = async (req, res) => {
  try {
    const reservations = await readReservations();
    
    const userReservations = reservations.filter(
      r => r.userId === req.user.id
    );

    res.status(200).json(userReservations);

  } catch (error) {
    res.status(500).json({ message: "Error getting user reservations" });
  }
};



const getAllReservations = async (req, res) => {
  try {
    const reservations = await readReservations();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error getting reservations" });
  }
};



const getReservationsForGym = async (req, res) => {
  try {
    const gymId = Number(req.params.gymId);

    const gyms = await readGyms();
    const gym = gyms.find(g => g.id === gymId);

    if (!gym) {
      return res.status(404).json({ message: "Gym not found" });
    }


    if (
      req.user.role !== "admin" &&
      req.user.id !== gym.managerId
    ) {
      return res.status(403).json({ message: "Not allowed for this gym" });
    }

    const reservations = await readReservations();
    const gymReservations = reservations.filter(r => r.gymId === gymId);

    res.status(200).json(gymReservations);

  } catch (error) {
    res.status(500).json({ message: "Error getting gym reservations" });
  }
};



module.exports = {
  createReservation,
  getMyReservations,
  getAllReservations,
  getReservationsForGym
};
