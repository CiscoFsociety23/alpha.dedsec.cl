export interface ServiceInformation {
    server: string,
    services: Services[]
}

export interface Services {
    name: string,
    status: string
}
