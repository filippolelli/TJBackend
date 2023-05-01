export default interface IAuthService {
    authenticate({
        email,
        password,
    }: {
        email: string
        password: string
    }): Promise<string>
}
