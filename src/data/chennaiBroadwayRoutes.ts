import { BusRoute } from '../types';
import { CHENNAI_BROADWAY_BATCH_1 } from './chennaiBroadwayBatch1';
import { CHENNAI_BROADWAY_BATCH_2 } from './chennaiBroadwayBatch2';

export const CHENNAI_BROADWAY_ORIGIN_ROUTES: BusRoute[] = [
  ...CHENNAI_BROADWAY_BATCH_1,
  ...CHENNAI_BROADWAY_BATCH_2
];
