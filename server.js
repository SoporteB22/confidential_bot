import express from "express";
import querystring from "querystring";

const app = express();

// Necesario para Slack slash commands e interacciones
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Comando principal
app.post("/confidential", (req, res) => {
  const text = req.body.text || "(sin texto)";
  const user = req.body.user_name || "alguien";

  // Enviamos un bloque con botón
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
              text: "👁 Ver mensaje"
            },
            action_id: "show_confidential",
            value: text
          }
        ]
      }
    ]
  });
});

// Endpoint de interacción (el botón)
app.post("/interact", (req, res) => {
  try {
    // Slack manda el payload como texto urlencoded
    const payload = JSON.parse(req.body.payload);
    const action = payload.actions[0];
    const text = action.value;

    // Respondemos con mensaje efímero
    res.json({
      response_type: "ephemeral",
      text: `💬 *Mensaje confidencial:* ${text}`
    });
  } catch (err) {
    console.error("Error en /interact:", err);
    res.status(200).send("Error procesando interacción 😅");
  }
});

// Test básico
app.get("/", (req, res) => res.send("🤖 SpoilerBot activo ✅"));

// Keep-alive (para Render)
setInterval(() => {
  fetch("https://confidential-bot.onrender.com/")
    .then(() => console.log("Keep-alive ping enviado 🚀"))
    .catch(() => console.log("Error en keep-alive ping ❌"));
}, 1000 * 60 * 5);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT} ✅`));
