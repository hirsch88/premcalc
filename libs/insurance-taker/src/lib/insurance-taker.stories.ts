import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
// import { action } from '@storybook/addon-actions';

import { InsuranceTakerComponent } from './insurance-taker.component';

const meta: Meta<InsuranceTakerComponent> = {
  title: 'Lib/InsuranceTaker',
  component: InsuranceTakerComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  render: (args: InsuranceTakerComponent) => ({
    props: {
      ...args,
      // onPinTask: actionsData.onPinTask,
      // onArchiveTask: actionsData.onArchiveTask,
    },
    template: `<lib-insurance-taker ${argsToTemplate(
      args
    )}></lib-insurance-taker>`,
  }),
};

export default meta;
type Story = StoryObj<InsuranceTakerComponent>;

export const Default: Story = {
  args: {
    // task: {
    //   id: '1',
    //   title: 'Test Task',
    //   state: 'TASK_INBOX',
    // },
  },
};
