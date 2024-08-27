import 'styled-components';
import { ColorsTypes, DevicesTypes } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorsTypes;
    devices: DevicesTypes;
  }
}
