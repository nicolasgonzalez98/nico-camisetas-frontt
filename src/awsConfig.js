import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "sa-east-1", // Cambia esto a tu región de AWS
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
  },
});

export default s3Client;
