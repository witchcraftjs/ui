import { type Ref } from "vue";
/**
 *
 * This takes the value of the element at the given id (onBeforeMount, i.e. pre-hydration if available), and sets the given ref to that value onMounted.
 *
 * This should be compatible with both nuxt and vue.
 *
 * Nore that while it's generic, you will need to provide a transform function to convert the string to the desired type.
 *
 * @experimental
 */
export declare function usePreHydrationValue<T>(id: string, refVal: Ref<T>, transform?: (val: string) => T): void;
//# sourceMappingURL=usePreHydrationValue.d.ts.map