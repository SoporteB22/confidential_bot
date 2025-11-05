import express from "express";

const app = express();

// Middleware actualizado
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/confidential", (req, res) => {
  try {
    const text = req.body.text || "(sin texto)";
    const user = req.body.user_name || "alguien";

    res.status(200).json({
      response_type: "in_channel",
      text: `🤫 *Mensaje confidencial de ${user}:*\n> ||${text}||`
    });
  } catch (err) {
    console.error("Error en /confidential:", err);
    res.status(200).send("Error interno 😅");
  }
});

app.get("/", (req, res) => res.send("SpoilerBot activo ✅"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));


