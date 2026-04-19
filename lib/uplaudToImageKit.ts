import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
export async function uploadToImageKit({image, token, signature, expire}: {image: File, token: string, signature: string, expire: number}) {
    try {
        const publicKey = process.env.IMAGEKIT_PUBLIC_KEY as string;
     const uploadResponse = await upload({
                // Authentication parameters
                expire,
                token,
                signature,
                publicKey,
                file: image,
                fileName: image.name, // Optionally set a custom file name
                //
               
            });

        return uploadResponse;
    } catch (error) {
        throw new Error("Failed to upload image to ImageKit");
    }

}