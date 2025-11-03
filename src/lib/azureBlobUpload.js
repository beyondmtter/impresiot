import { BlobServiceClient } from "@azure/storage-blob";
import { Buffer } from "buffer";

const containerName = "avatar";
const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);

export const uploadImageToBlob = async (base64Image) => {
  try {
    // Remove the prefix from base64 string
    const base64Data = base64Image.split(",")[1]; 
    const buffer = Buffer.from(base64Data, "base64");

    // Generate a unique blob name
    const timestamp = Date.now();
    const blobName = `avatar-${timestamp}.jpg`; // Adjust extension based on image type

    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Set content type to image/jpeg
    const uploadOptions = {
      blobHTTPHeaders: { blobContentType: "image/jpeg" }, 
    };

    // Upload the image data
    await blockBlobClient.uploadData(buffer, uploadOptions);

    // Return the URL of the uploaded image
    return blockBlobClient.url;
  } catch (error) {
    console.error("Error uploading image to Azure Blob:", error);
    throw new Error("Failed to upload image");
  }
};
