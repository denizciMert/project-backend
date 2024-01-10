import app from "./app.js";
import connectDatabase from "./db/openConDB.js";

//connections and listeners
const PORT = process.env.PORT || 5000;
connectDatabase()
  .then(() => {
    app.listen(PORT, () => console.log("DB Check: Done. Server Check: Done.")
    );
  })
  .catch((err) => console.log(err))