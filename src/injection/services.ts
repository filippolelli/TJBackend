import IAuthService from '@services/auth/interface'
import AuthService from '@services/auth/service'
import IMediaService from '@services/media/interface'
import MediaService from '@services/media/service'
import IRegisterService from '@services/register/interface'
import RegisterService from '@services/register/service'
import IUserService from '@services/user/interface'
import UserService from '@services/user/service'

export function getUserService(): IUserService {
    return new UserService()
}

export function getAuthService(): IAuthService {
    return new AuthService()
}

export function getRegisterService(): IRegisterService {
    return new RegisterService()
}

export function getMediaService(): IMediaService {
    return new MediaService()
}
