import type { InterpolatedVars } from "metamorphosis/InterpolatedVars"

export type MetamorphosisInterpolatedVarsProps = {
/** The InterpolatedVars instance to control. Be sure to mark it raw, it has a custom internal signalling system we hook into. */
	interpolatedVars: InterpolatedVars
	/**
	 * Whether to allow switching between evenly spaced and custom stops mode.
	 * By default this is true and + and - buttons are shown for the gradient strip.
	 *
	 * When the component is in "stopless" mode and the user clicks the + button, the component switches to "stops" mode without actually adding a stop (user must click again).
	 *
	 * When it's in "stops" mode and the user clicks the - button and there were only two stops, no stop is removed, the component goes into "stopless" mode instead.
	 */
	allowSwitchingStopsMode?: boolean
	/** Whether to show the + / - buttons for increasing or decreasing the interpolation step count. */
	allowModifyingSteps?: boolean
	/**
	 * This will show the drag handles even when there aren't stops and change the instance to use stops the moment the user drags a handle.
	 *
	 * Why? Say you have a base theme that you want to be evenly spaced, but you want users to be able to drag the handles to change the values.
	 */
	forceDisplayStopHandles?: boolean
}
