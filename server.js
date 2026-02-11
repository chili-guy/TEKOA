const dotenv = require("dotenv");
const app = require("./api");

dotenv.config();

const port = Number(process.env.PORT || 5174);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

