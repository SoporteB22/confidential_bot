import express from "express";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Slash command
app.post("/confidential", (req, res) => {
  const text = req.body.text || "(sin texto)";
  const user = req.body.user_name || "alguien";

  // Mensaje principal con botón
  res.json({
    response_type: "in_channel",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `🤫 *Mensaje confidencial de ${user}*`
        }
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "👁 Mostrar mensaje confidencial"
            },
            action_id: "show_confidential",
            value: text
          }
        ]
      }
    ]
  });
});

// Evento de interacción (cuando alguien pulsa el botón)
app.post("/interact", (req, res) => {
  const payload = JSON.parse(req.body.payload);
  const text = payload.actions[0].value;

  // Respuesta efímera (solo visible para quien hizo clic)
  res.json({
    response_type: "ephemeral",
    text: `💬 *Mensaje confidencial:* ${text}`
  });
});

app.get("/", (req, res) => res.send("🤖 SpoilerBot activo ✅"));

setInterval(() => {
  fetch("https://confidential-bot.onrender.com/")
    .then(() => console.log("Keep-alive ping enviado 🚀"))
    .catch(() => console.log("Error en keep-alive ping ❌"));
}, 1000 * 60 * 5);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT} ✅`));


