export declare const twMerge: (...classLists: import("tailwind-merge").ClassNameValue[]) => string;
export declare const twMergeExtend: {
    extend: {
        classGroups: {
            "focus-outline": {
                "focus-outline": string[];
                "focus-outline-within": string[];
            }[];
            "text-overflow": string[];
            "mix-from": {
                "mix-from": (() => boolean)[];
            }[];
            "mix-to": {
                "mix-to": (() => boolean)[];
            }[];
            "mix-standalone": {
                tint: (() => boolean)[];
                shade: (() => boolean)[];
            }[];
            "bg-image": string[];
            "square-light": {
                "square-light": (() => boolean)[];
            }[];
            "square-dark": {
                "square-dark": (() => boolean)[];
            }[];
            "square-size": {
                "square-size": (() => boolean)[];
            }[];
            "bars-angle": {
                "bars-angle": (() => boolean)[];
            }[];
            "bars-fg": {
                "bars-fg": (() => boolean)[];
            }[];
            "bars-bg": {
                "bars-bg": (() => boolean)[];
            }[];
            "bars-w": {
                "bars-w": (() => boolean)[];
            }[];
            "styled-scrollbar-w": {
                "styled-scrollbar-w": (() => boolean)[];
            }[];
            "styled-scrollbar-border": {
                "styled-scrollbar-border-w": (() => boolean)[];
            }[];
            "styled-scrollbar-color": {
                "styled-scrollbar": (() => boolean)[];
            }[];
            "styled-scrollbar-bg": {
                "styled-scrollbar-bg": (() => boolean)[];
            }[];
            "styled-resizer-w": {
                "styled-resizer-w": (() => boolean)[];
            }[];
            "styled-resizer-color": {
                "styled-resizer-color": (() => boolean)[];
            }[];
        };
        conflictingClassGroups: {
            "mix-standalone": readonly ["mix-from", "mix-to"];
        };
    };
};
//# sourceMappingURL=twMerge.d.ts.map