import { Currency, CurrencyExceptDefault } from '@interfaces/ICurrency';

export const CURRENCIES = <const>[
  'aed',
  'afn',
  'all',
  'amd',
  'ang',
  'aoa',
  'ars',
  'aud',
  'awg',
  'azn',
  'bam',
  'bbd',
  'bdt',
  'bgn',
  'bhd',
  'bif',
  'bmd',
  'bnd',
  'bob',
  'brl',
  'bsd',
  'btn',
  'bwp',
  'byn',
  'bzd',
  'cad',
  'cdf',
  'chf',
  'clf',
  'clp',
  'cnh',
  'cny',
  'cop',
  'crc',
  'cuc',
  'cup',
  'cve',
  'czk',
  'djf',
  'dkk',
  'dop',
  'dzd',
  'egp',
  'ern',
  'etb',
  'eur',
  'fjd',
  'fkp',
  'gbp',
  'gel',
  'ggp',
  'ghs',
  'gip',
  'gmd',
  'gnf',
  'gtq',
  'gyd',
  'hkd',
  'hnl',
  'hrk',
  'htg',
  'huf',
  'idr',
  'ils',
  'imp',
  'inr',
  'iqd',
  'irr',
  'isk',
  'jep',
  'jmd',
  'jod',
  'jpy',
  'kes',
  'kgs',
  'khr',
  'kmf',
  'kpw',
  'krw',
  'kwd',
  'kyd',
  'kzt',
  'lak',
  'lbp',
  'lkr',
  'lrd',
  'lsl',
  'lyd',
  'mad',
  'mdl',
  'mga',
  'mkd',
  'mmk',
  'mnt',
  'mop',
  'mro',
  'mru',
  'mur',
  'mvr',
  'mwk',
  'mxn',
  'myr',
  'mzn',
  'nad',
  'ngn',
  'nio',
  'nok',
  'npr',
  'nzd',
  'omr',
  'pab',
  'pen',
  'pln',
  'pgk',
  'php',
  'pkr',
  'pyg',
  'qar',
  'ron',
  'rsd',
  'rub',
  'rwf',
  'sar',
  'sbd',
  'scr',
  'sdg',
  'sek',
  'sgd',
  'shp',
  'sll',
  'sos',
  'srd',
  'ssp',
  'std',
  'stn',
  'svc',
  'syp',
  'szl',
  'thb',
  'tjs',
  'tmt',
  'tnd',
  'top',
  'try',
  'ttd',
  'twd',
  'tzs',
  'uah',
  'ugx',
  'usd',
  'uyu',
  'uzs',
  'vef',
  'ves',
  'vnd',
  'vuv',
  'wst',
  'yer',
  'zar',
  'zmw',
  'zwl',
];

export const DEFAULT_CURRENCY_AMOUNT = 100;
export const DEFAULT_QUOTE_CURRENCY = 'pln' satisfies Currency;
export const DEFAULT_BASE_CURRENCIES = [
  'usd',
  'eur',
  'gbp',
  'chf',
] satisfies CurrencyExceptDefault[];
