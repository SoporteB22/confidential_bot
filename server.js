import express from "express";

// Inicializa la app Express
const app = express();

// Middlewares para procesar peticiones de Slack
app.use(express.urlencoded({ extended: true })); // Slack envía x-www-form-urlencoded
app.use(express.json()); // Por si envías JSON en pruebas

// Ruta principal del comando /confidential
app.post("/confidential", (req, res) => {
  try {
    const text = req.body.text || "(sin texto)";
    const user = req.body.user_name || "alguien";

    // Respuesta visible en el canal
    res.status(200).json({
      response_type: "in_channel",
      text: `🤫 *Mensaje confidencial de ${user}:*\n> ||${text}||`
    });

    // Log de depuración (opcional)
    console.log("Comando recibido:", req.body);
  } catch (err) {
    console.error("Error en /confidential:", err);
    res.status(200).send("Ocurrió un error interno 😅");
  }
});

// Endpoint base (para comprobar que está vivo)
app.get("/", (req, res) => res.send("🤖 SpoilerBot activo ✅"));

// 💤 Keep-alive para Render
// Render apaga instancias inactivas; esto envía un ping cada 5 minutos
setInterval(() => {
  fetch("https://confidential-bot.onrender.com/")
    .then(() => console.log("Keep-alive ping enviado 🚀"))
    .catch(() => console.log("Error en keep-alive ping ❌"));
}, 1000 * 60 * 5); // cada 5 minutos

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT} ✅`));
