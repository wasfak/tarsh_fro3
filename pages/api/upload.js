import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.memoryStorage(); // Store the file in memory

const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await new Promise((resolve, reject) => {
        upload.single("file")(req, res, (err) => {
          if (err) return reject(err);
          resolve();
        });
      });

      const tempBuffer = req.file.buffer;

      // Replace any existing "1.xlsx" in the uploads folder
      const targetFolder = path.join(process.cwd(), "uploads");
      const targetFilePath = path.join(targetFolder, "1.xlsx");

      // Delete existing file if it exists
      if (fs.existsSync(targetFilePath)) {
        fs.unlinkSync(targetFilePath);
      }

      // Write the new file
      fs.writeFileSync(targetFilePath, tempBuffer);

      res.status(200).json({
        message: "File uploaded successfully",
        filePath: targetFilePath,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ error: "File upload failed" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
