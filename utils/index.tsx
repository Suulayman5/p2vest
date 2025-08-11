import { Dimensions } from "react-native";
import {toNumber} from 'lodash';

   export const DEVICE_DIMENSIONS = Dimensions.get('window');
   export const { width, height } = DEVICE_DIMENSIONS;    
   export const baseWidth = toNumber(360);
   export const baseHeight = toNumber(800);
   export const scaledSize = (size: number) => Math.ceil(size * scale);
   export const scaleWidth = width / baseWidth;
   export const scaleHeight = height / baseHeight;
   export const scale = Math.min(scaleWidth, scaleHeight);