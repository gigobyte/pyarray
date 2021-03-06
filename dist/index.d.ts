declare class Pyarray<T> {
    public constructor(array: Array<T>);
    public get(): Array<T>;
    public get(index: number): T;
    public get(start: number, end: number, step?: number): Array<T>;
    public append(data: T): void;
    public extend(list: Array<T>): void;
    public insert(index: number, data: T): void;
    public remove(index: number): void;
    public pypop(index: number): T;
    public index(data: T): number;
    public count(data: T): number;
}

declare type PyArray<T> = Pyarray<T> & Array<T>;

declare function pyarray<T>(list: Array<T>): PyArray<T>;

export { PyArray };

export default pyarray;