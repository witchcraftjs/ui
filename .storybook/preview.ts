import { Preview,Parameters } from '@storybook/vue3';
import TestWrapper from "../src/TestWrapper.vue"
import {extractRootEl} from "../src/directives/extractRootEl.js"
import "../src/assets/style.css"

import { library } from "@fortawesome/fontawesome-svg-core"
import { far } from "@fortawesome/free-regular-svg-icons"
import { fas } from "@fortawesome/free-solid-svg-icons"
library.add(fas, far)

export const parameters:Parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    controls: { expanded: true },
  },
  layout: "fullscreen",
  backgrounds: {
    default: 'default',
    values: [
      {
        name: 'light',
        value: 'var(--cGray0)',
      },
      {
        name: 'dark',
        value: 'var(--cGray10)',
      },
      {
        name: "default",
        value: 'var(--cBg)',
      },
    ],
  },
}



const preview: Preview = {
  globalTypes: {
    darkMode: {
      // defaultValue: true, // Enable dark mode by default on all stories
    },
  },
  decorators: [(story, { args }) => ({
    directives: {extractRootEl},
		components: { TestWrapper, story },
		setup: () => ({ args }),
		template: `
			<test-wrapper :outline="args.outline"><story/></test-wrapper>
    `,
  })],
  args: {
    outline:false,
  }
};
export default preview;
