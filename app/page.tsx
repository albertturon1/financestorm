import { PADDING_TAILWIND } from '@constants/globals';
import MainRedirectButton from '@features/main/MainRedirectButton';

import { USER_ID } from './Navbar';

const HomePage = () => (
  <div
    className={`${PADDING_TAILWIND} grid flex-1 grid-cols-1 gap-y-2 lg:gap-5 pb-4 md:grid-cols-2`}
  >
    <MainRedirectButton
      image="/assets/images/dashboard.png"
      title="Panel użytkownika"
      subtitle="Zarządzaj swoim kontem i preferencjami za pomocą panelu użytkownika"
      href={`/user/${USER_ID}`}
    />
    <MainRedirectButton
      image="/assets/images/wallet-history.png"
      title="Dzisiejsze kursy walut"
      subtitle="Sprawdź dzisiejsze kursy walut i bądź na bieżąco z rynkiem walutowym."
      href="/currencies/pln"
    />
    <MainRedirectButton
      image="/assets/images/multi-currencies.png"
      title="Historyczne kursy walut"
      subtitle="Przejrzyj archiwalne kursy walut i analizuj zmiany wartości poszczególnych walut w czasie."
      href="/multi-currencies"
    />
  </div>
);

export default HomePage;
