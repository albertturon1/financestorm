import { PADDING_TAILWIND } from '@constants/Globals';
import MainRedirectButton from '@features/main/MainRedirectButton';

const HomePage = () => (
  <div
    className={`${PADDING_TAILWIND} grid flex-1 grid-cols-1 gap-2 pb-4 md:grid-cols-2 lg:gap-5`}
  >
    <MainRedirectButton
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
    />
  </div>
);

export default HomePage;
