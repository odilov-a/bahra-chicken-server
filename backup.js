console.log("Backuper is working");
const cron = require("node-cron");
const { exec } = require("child_process");
const fs = require("fs");
const archiver = require("archiver");
const axios = require("axios");
const FormData = require("form-data");
const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const MONGO_URI = process.env.MONGO_URL;
const BACKUP_PATH = "./backup";
const UPLOADS_PATH = "./uploads";
const databaseName = process.env.DATABASE_NAME;

if (!TOKEN || !CHAT_ID || !MONGO_URI || !databaseName) {
    console.error("Missing required environment variables.");
    process.exit(1);
}

function backupDatabase() {
    const command = `mongodump --uri="${MONGO_URI}" --out="${BACKUP_PATH}/${databaseName}"`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error("Database backup error:", error);
            return;
        }
        console.log("Database backup created successfully");
        zipAndSend();
    });
}

async function zipAndSend() {
    const zipPath = `./backup/${databaseName}.zip`;
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });
    output.on("close", function () {
        console.log(
            "Archive created successfully. Total bytes:",
            archive.pointer()
        );
        sendDocumentToTelegramChannel(zipPath, CHAT_ID, TOKEN)
            .then(() => {
                console.log("Backup sent to Telegram successfully.");
            })
            .catch((err) => {
                console.error("Failed to send backup to Telegram:", err);
            });
    });
    archive.on("error", function (err) {
        console.error("Archive error:", err);
        throw err;
    });
    archive.pipe(output);
    archive.directory(`./backup/${databaseName}/`, false);
    archive.directory(UPLOADS_PATH, "uploads"); // Include uploads folder in the zip
    archive.finalize();
}

async function sendDocumentToTelegramChannel(filePath, chatId, botToken) {
    const url = `https://api.telegram.org/bot${botToken}/sendDocument`;
    const formData = new FormData();
    formData.append("document", fs.createReadStream(filePath));
    formData.append("chat_id", chatId);

    try {
        const response = await axios.post(url, formData, {
            headers: { ...formData.getHeaders() },
        });
        console.log("Document sent successfully:", response.data);
    } catch (error) {
        console.error("Failed to send document:", error);
    }
}

cron.schedule(
    "0 0 * * *",
    () => {
        console.log("Starting scheduled database backup");
        backupDatabase();
    },
    {
        scheduled: true,
        timezone: "America/New_York",
    }
);