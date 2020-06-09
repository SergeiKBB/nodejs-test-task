export interface IPicture {
    large: string
    medium: string
    thumbnail: string
}

export interface IUserName {
    title: string
    first: string
    last: string
}

export interface IUserPassword {
    sha256: string
    salt: string
}

export interface IUser {
    name: IUserName
    gender: string
    email: string
    picture: IPicture
    password?: IUserPassword
    removed: boolean
}

export interface IUserLogin {
    uuid: string
    username: string
    password: string
    salt: string
    md5: string
    sha1: string
    sha256: string
}

export interface IRandomUser {
    gender: string
    name: IUserName
    location: any
    email: string
    login: IUserLogin
    dob: any
    registered: any
    phone: string
    cell: string
    id: any
    picture: IPicture
    nat: string
}
