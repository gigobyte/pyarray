declare class Pyarray<T> {
    public constructor(array: Array<T>);
    public get(): Array<T>;
    public append(data: T): void;
    public extend(list: Array<T>): void;
    public insert(index: number, data: T): void;
    public remove(index: number): void;
    public pypop(index: number): T;
    public index(data: T): number;
    public count(data: T): number;
}

declare interface PyArrayIndex<T> {
    [index: string]: Array<T>;
}

declare type PyArray<T> = PyArrayIndex<T> & Pyarray<T> & Array<T>;

declare function pyarray<T>(list?: Array<T>): PyArray<T>;

export { Pyarray, PyArray };

export default pyarray;