import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import * as balIcons from '@baloise/ds-icons';
import { provideBaloiseDesignSystem } from '@baloise/ds-angular';

import { LocationDocComponent } from './location.doc.component';
import { createLocationModel } from '../location.model';
import { LocationRepository } from '../location.repository';
import { BehaviorRepository } from '@premcalc/forms';
import { LocationApiService, LocationApiServiceT } from '../location.api';
import { Observable } from 'rxjs';

const meta: Meta<LocationDocComponent> = {
  title: 'Lib/Location',
  component: LocationDocComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  args: {
    model: createLocationModel(),
    debug: true,
    apiResponse: {
      result: [
        {
          cityName: 'Vessy',
          canton: 'CH_GE',
        },
      ],
      id: 'QID: -|SID: -|requestID: 7678476b94',
      jsonrpc: '2.0',
    },
  },
  argTypes: {
    debug: {
      table: {
        subcategory: 'Debug',
      },
    },
    apiResponse: {
      table: {
        subcategory: 'Debug',
      },
    },
  },
  render: (args: LocationDocComponent) => ({
    applicationConfig: {
      providers: [
        provideBaloiseDesignSystem({
          defaults: {
            icons: balIcons,
          },
        }),
        {
          provide: LocationRepository,
          useClass: BehaviorRepository,
        },
        {
          provide: LocationApiService,
          useValue: {
            findCities() {
              return new Observable((subscriber) =>
                subscriber.next(args.apiResponse.result.map((r) => r.cityName))
              );
            },
          } as LocationApiServiceT,
        },
      ],
    },
    props: {
      ...args,
      onModelChanged: action('modelChanged'),
    },
    template: `<lib-location-doc ${argsToTemplate(args)}></lib-location-doc>`,
  }),
};

export default meta;
type Story = StoryObj<LocationDocComponent>;

export const Default: Story = {};

// export const TwoCities: Story = {
//   args: {
//     apiResponse: {
//       result: [
//         {
//           cityName: 'Basel',
//           canton: 'CH_BS',
//         },
//       ],
//       id: 'QID: -|SID: -|requestID: 7678476b94',
//       jsonrpc: '2.0',
//     },
//   },
// };
