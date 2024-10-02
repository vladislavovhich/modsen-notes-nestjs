export default () => ({
    db: {
        url: process.env.DB_URL,
        name: process.env.DB_NAME
    },
    cloudinary: {
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        folder: process.env.CLOUDINARY_FOLDER_NAME,
    }
})