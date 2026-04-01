import { SetMetadata } from '@nestjs/common';

export const PLANS_KEY = 'plans';
export const RequiresPlan = (...plans: string[]) => SetMetadata(PLANS_KEY, plans);
