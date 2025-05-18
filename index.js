const express = require("express");
const app = express();

const carQueryRoutes = require("./routes/carquery");

app.use("/api/carquery", carQueryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is listening on port: ${PORT}`);
});