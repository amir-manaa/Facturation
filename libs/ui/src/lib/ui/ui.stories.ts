import type { Meta, StoryObj } from '@storybook/angular';
import { UiComponent } from './ui';
import { expect } from 'storybook/test';

const meta: Meta<UiComponent> = {
  component: UiComponent,
  title: 'Ui',
};
export default meta;

type Story = StoryObj<UiComponent>;

// export const Primary: Story = {
//   args: {},
// };

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/ui/gi)).toBeTruthy();
  },
};


//////////////////////////////////////////
export const Primary: Story = {
  args: { variant: 'primary' },
  render: (args) => ({
    props: args,
    template: `<lib-button [variant]="variant">Click me</lib-button>`,
  }),
};

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true },
  render: (args) => ({
    props: args,
    template: `<lib-button [variant]="variant" [disabled]="disabled">Disabled</lib-button>`,
  }),
};
