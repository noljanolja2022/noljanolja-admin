declare type Nullable<T> = T | null;
declare type Undefinable<T> = T | undefined;
declare type NullList<T> = T | undefined | null;
declare type ComponentSize = 'large' | 'medium' | 'small';
declare type VoidFunc<T = any> = (value: T) => void;
declare type PureVoidFunc = () => void;
declare type GenericObject<T extends object = {}> = GenericObject<T>;