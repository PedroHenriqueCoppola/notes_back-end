require("dotenv/config")
require("express-async-errors");

const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");
const express = require("express");
const uploadConfig = require("./configs/upload")
const routes = require("./routes");
const cors = require("cors");

migrationsRun();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes);

app.use((error, request, response, next) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message,
        });
    }

    console.error(error);

    return response.status(500).json({
        status: "error",
        message: "Internal server error",
    });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)); // fica escutando aí. quando o programa iniciar, mandar no console "server is running"
