import type { Ref } from "vue";
export declare const createRecorderHandler: (recordingValue: Ref<string>, recording: Ref<boolean>, modelValue: Ref<string>, recordingEl: Ref<null | HTMLElement>) => {
    keydown(e: KeyboardEvent): void;
    mousedown(e: MouseEvent): void;
    wheel(e: WheelEvent): void;
};
export declare const createRecorderWatchEffect: (recordingValue: Ref<string>, recording: Ref<boolean>, modelValue: Ref<string>, values?: Ref<string[]>) => () => void;
//# sourceMappingURL=storybook.d.ts.map