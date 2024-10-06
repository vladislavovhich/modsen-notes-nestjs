export type Config = {
    db: DbConfig
    cloudinary: CloudinaryConfig
    github: GithubConfig
    google: GoogleConfig
    jwt: JwtConfig
}

export type DbConfig = {
    url: string,
    name: string
}

export type CloudinaryConfig = {
    apiKey: string
    apiSecret: string
    cloudName: string
    folder: string
}

export type GithubConfig = {
    clientId: string
    clientSecret: string
    callbackURL: string
}

export type GoogleConfig = {
    clientId: string
    clientSecret: string
    callbackURL: string
}

export type JwtConfig = {
    expiresIn: string
    secret: string
}