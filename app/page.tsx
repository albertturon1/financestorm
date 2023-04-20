import dynamic from 'next/dynamic';

import PageMaxWidth from '@components/PageMaxWidth';
import PagePadding from '@components/PagePadding';
import PopularCurrencyRates from '@components/PopularCurrencyRates';

// const PopularCurrencyRates = dynamic(
//   () => import('@components/PopularCurrencyRates'),
//   { ssr: false },
// );

const HomePage = () => (
  <PageMaxWidth>
    <PagePadding vertical>
      <PopularCurrencyRates />
      {/* <UserFavouriteCurrencyRate /> */}
      {/* <MainRedirectButton
      image="/assets/images/dashboard.png"
      title="Panel użytkownika"
      subtitle="Zarządzaj swoim kontem i preferencjami za pomocą panelu użytkownika"
      href={`/user/${process.env.NEXT_PUBLIC_USER_ID ?? ''}`}
    />
    <MainRedirectButton
      image="/assets/images/wallet-history.png"
      title="Dzisiejsze kursy walut"
      subtitle="Sprawdź dzisiejsze kursy walut i bądź na bieżąco z rynkiem walutowym."
      href="currencies"
      />
      <MainRedirectButton
      image="/assets/images/multi-currencies.png"
      title="Historyczne kursy walut"
      subtitle="Przejrzyj archiwalne kursy walut i analizuj zmiany wartości poszczególnych walut w czasie."
      href="/multi-currencies"
    /> */}
    </PagePadding>
  </PageMaxWidth>
);

export default HomePage;
