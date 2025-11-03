import { BlobServiceClient } from "@azure/storage-blob";

const containerName = "avatar";
const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);

export const deleteImageFromBlob = async (blobName) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.deleteIfExists();

    console.log(`Blob ${blobName} deleted successfully`);
  } catch (error) {
    console.error("Error deleting image from Azure Blob:", error);
    throw new Error("Failed to delete image");
  }
};
