export interface CurrencyRatePairRequest {
  baseCurrency: string;
  quoteCurrency: string;
}

export const RealtimeCurrencyExchangeRateName =
  'Realtime Currency Exchange Rate' as const;

export interface RealtimeCurrencyExchangeRate {
  '1. From_Currency Code': string;
  '2. From_Currency Name': string;
  '3. To_Currency Code': string;
  '4. To_Currency Name': string;
  '5. Exchange Rate': string;
  '6. Last Refreshed': string;
  '7. Time Zone': string;
  '8. Bid Price': string;
  '9. Ask Price': string;
}
export interface RealtimeCurrencyExchangeRateModified {
  From_Currency_Code: string;
  From_Currency_Name: string;
  To_Currency_Code: string;
  To_Currency_Name: string;
  Exchange_Rate: string;
  Last_Refreshed: string;
  Time_Zone: string;
  Bid_Price: string;
  Ask_Price: string;
}

export interface CurrencyRatePairResponse {
  RealtimeCurrencyExchangeRateName?: RealtimeCurrencyExchangeRate;
  Note?: string;
}
