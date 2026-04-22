
import { Client } from "minio";
import dotenv from "dotenv";
import GeneralConfig from "./GeneralConfig";

dotenv.config();

const minioClient = new Client({
  endPoint: GeneralConfig.MINIO_ENDPOINT || "localhost",
  port: parseInt(GeneralConfig.MINIO_PORT || "9000", 10),
  useSSL: GeneralConfig.MINIO_USE_SSL, // Change to true if using HTTPS
  accessKey: GeneralConfig.MINIO_ACCESS_KEY || "",
  secretKey: GeneralConfig.MINIO_SECRET_KEY || "",
});

const bucketName = process.env.MINIO_BUCKET || "uploads";

// Ensure the bucket exists
(async () => {
  try {
    const exists = await minioClient.bucketExists(bucketName);
    if (!exists) {
      await minioClient.makeBucket(bucketName, "us-east-1");
      console.log(`Bucket '${bucketName}' created successfully.`);
    }
  } catch (error) {
    console.error("Error ensuring bucket:", error);
  }
})();

export { minioClient, bucketName };
