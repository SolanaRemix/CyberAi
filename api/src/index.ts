import { app } from "./server";

const port = Number(process.env.PORT) || 4000;
app.listen(port, () => console.log(`API listening on :${port}`));
