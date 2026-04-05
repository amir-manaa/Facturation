import type { Meta, StoryObj } from '@storybook/angular';
import { Button } from './button';
import { expect } from 'storybook/test';

const meta: Meta<Button> = {
  component: Button,
  title: 'Button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Style visuel du bouton',
      control: 'radio', // type de control
      options: ['primary', 'secondary'],
    },
    label: {
      description: 'Texte affiché',
      control: 'text',
    },
    type: {
      description: 'Texte affiché',
      control: 'radio',
      options: ['button', 'submit', 'reset'],
    },
    disabled: {
      description: 'Désactive le bouton',
      control: 'boolean',
    },
  },
};
export default meta;

type Story = StoryObj<Button>;

// 2. Chaque Story = un état du composant
export const Primary: Story = {
  args: {
    label: 'Enregistrer',
    variant: 'primary',
    type: 'button',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Enregistrer',
    variant: 'secondary',
    type: 'button',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Non disponible',
    type: 'button',
    disabled: true,
  },
};
