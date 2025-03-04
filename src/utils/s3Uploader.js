import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
//import s3Client from "@/awsConfig";

// Configuración de AWS
const s3 = new S3Client({
    region: import.meta.env.VITE_AWS_REGION, 
    credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY, 
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY
    }
});



// Función para subir imagen
export async function uploadImage(file) {
  const fileName = `${Date.now()}-${file.name}`;
  const params = {
    Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
    Key: fileName,
    ContentType: file.type
  };

  try {
    const uploadUrl = await getSignedUrl(s3, new PutObjectCommand(params), { expiresIn: 60 });

    const response = await fetch(uploadUrl, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type }
    });

    if (!response.ok) throw new Error("Error al subir la imagen");

    return `https://${BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
  } catch (error) {
    console.error("Error en la subida:", error);
    return null;
  }
}