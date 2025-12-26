const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(__dirname, "..", "data", "coaches.json");


function readCoaches() {
  try {
    if (!fs.existsSync(DATA_PATH)) {
      return [];
    }

    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    const data = JSON.parse(raw || "[]");

    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Failed to read coaches.json:", err);
    return [];
  }
}

function writeCoaches(coaches) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(coaches, null, 2));
}


exports.getAllCoaches = (req, res) => {
  const coaches = readCoaches();
  res.json(coaches);
};


exports.getCoachById = (req, res) => {
  const coaches = readCoaches();
  const id = String(req.params.id);

  const coach = coaches.find(
    (c) => String(c.id ?? c._id ?? c.coachId) === id
  );

  if (!coach) {
    return res.status(404).json({ message: "Coach not found" });
  }

  res.json(coach);
};


exports.createCoach = (req, res) => {
  const coaches = readCoaches();
  const body = req.body || {};

  const newCoach = {
    id: body.id ?? Date.now(), // simple unique id
    name: body.name ?? "Unnamed Coach",
    city: body.city ?? "Unknown city",
    rating: typeof body.rating === "number" ? body.rating : 0,
    skills: Array.isArray(body.skills) ? body.skills : [],
    createdAt: new Date().toISOString(),
  };

  coaches.push(newCoach);
  writeCoaches(coaches);

  res.status(201).json(newCoach);
};


exports.updateCoach = (req, res) => {
  const coaches = readCoaches();
  const id = String(req.params.id);
  const body = req.body || {};

  const index = coaches.findIndex(
    (c) => String(c.id ?? c._id ?? c.coachId) === id
  );

  if (index === -1) {
    return res.status(404).json({ message: "Coach not found" });
  }

  coaches[index] = {
    ...coaches[index],
    ...body,
    id: coaches[index].id, // prevent id overwrite
    updatedAt: new Date().toISOString(),
  };

  writeCoaches(coaches);
  res.json(coaches[index]);
};

exports.deleteCoach = (req, res) => {
  const coaches = readCoaches();
  const id = String(req.params.id);

  const filtered = coaches.filter(
    (c) => String(c.id ?? c._id ?? c.coachId) !== id
  );

  if (filtered.length === coaches.length) {
    return res.status(404).json({ message: "Coach not found" });
  }

  writeCoaches(filtered);
  res.json({ message: "Coach deleted" });
};
 