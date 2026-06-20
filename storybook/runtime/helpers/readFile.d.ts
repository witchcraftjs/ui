/**
 * @deprecated
 * Use file.arrayBuffer(), file.text(), or URL.createObjectURL(file) and avoid base64 urls instead.
 */
export declare const readFile: <TType extends "DataUrl" | "ArrayBuffer" | "BinaryString" | "text" = "DataUrl">(file?: File | Blob, type?: TType) => Promise<TType extends "ArrayBuffer" ? ArrayBuffer : string>;
//# sourceMappingURL=readFile.d.ts.map