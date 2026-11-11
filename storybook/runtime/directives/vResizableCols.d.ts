import type { Directive } from "vue";
/**
 * Allow a table like element to be resized along it's columns.
 *
 * ```vue
 * <template>
 * 	<div v-resizable-cols="opts">
 * 			<!---->
 * 	</div>
 * </template>
 * <script setup>
 * import {vResizeCols} from "@witchcraft/ui/directives/vResizableCols"
 * </script>
 * ```
 *
 * This assumes the following:
 * - The `.grip` element the directive adds for each column is styled with at least some width.
 * - The containing element must not have any borders. Use a wrapper if you need them.
 *
 * This will set the following styles on the elements:
 *
 * ```css
 * el {
 * 	min-width: [opts.minWidth * col #] // only if needed, see margin and fitWidth options
 * 	min-width: min-content; // if fitWidth: false
 * 	.grip {
 * 		position: absolute;
 * 		top: 0;
 * 		bottom: 0;
 * 		cursor: col-resize;
 * 	}
 * 	[cells] {
 * 		none
 * 	}
 * }
 * ```
 * Note that they aren't removed if the directive is disabled.
 *
 * It does NOT set the widths on the cells. It used to, but for maximum flexibility a ref with an array should be passed to be populated by the widths calculated.
 *
 * Additionally the following are suggested:
 * - If fitWidth is true, `overflow: hidden` should be set on the column elements to avoid glitches when dragging the last column near the right edge.
 * - The root element should have `overflow-x:scroll` even if `fitWidth` is true, since there is some minimum space (margin+grip * col) the element will always occupy.
 *
 * The directive also adds a class after the initial setup `resizable-cols-setup`. This is useful to set initial column widths, for example, using flexboxes, then removing those styles when the element is setup. You can also check if the passed widths array is still of 0 length.
 *
 * ```css
 * el:not(.resizable-cols-setup) {
 * 	initial styles
 * }
 * ```
 *
 * You can prevent columns from being resized by adding the class `no-resize`. When a column cannot be moved, the `resizable-cols-error` class is added to the element.
 *
 * Also note the `.grip` element added is added to the root element. This is so you can have `overflow:hidden` on cells if you want without the grip getting hidden. But this does mean that if you're styling the cells using `:last-child`, to, for example, target table rows, won't work, you'll need `:last-of-type`.
 *
 * # Options
 * See {@link ResizableOptions}
 */
export declare const vResizableCols: Directive;
//# sourceMappingURL=vResizableCols.d.ts.map