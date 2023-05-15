import { MonthlyCPIRequest } from '../interfaces/IOECDApi';

export const OECD_KEYS = {
  all: ['OECD'] as const,
  monthlyCPI: (props: MonthlyCPIRequest) =>
    [...OECD_KEYS.all, 'monthlyCPI', props] as const,
};
