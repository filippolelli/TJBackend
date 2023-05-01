export default interface IBaseRepository<T> {
    create(item: T): Promise<void>
    getById(id: string): Promise<T>
    update(id: string, item: T): Promise<void>
    remove(id: string): Promise<void>
}
