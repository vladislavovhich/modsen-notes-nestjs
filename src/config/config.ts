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
    },
    github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
    },
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    jwt: {
        expiresIn: process.env.JWT_EXPIRES_IN,
        secret: process.env.JWT_SECRET
    }
})