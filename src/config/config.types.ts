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
}

export type GoogleConfig = {
    clientId: string
    clientSecret: string
}

export type JwtConfig = {
    expiresIn: string
    secret: string
}