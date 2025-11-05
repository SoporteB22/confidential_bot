import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta principal del comando /spoiler
app.post("/confidential", (req, res) => {
  const text = req.body.text || "(sin texto)";
  const user = req.body.user_name || "alguien";

  // Responder inmediatamente
  res.json({
    response_type: "in_channel",
    text: `🤫 *Mensaje confidencial de ${user}:*\n> ||${text}||`
  });
});


// Ruta de prueba opcional
app.get("/", (req, res) => {
  res.send("SpoilerBot activo ✅");
});

// Render usa PORT automáticamente
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
