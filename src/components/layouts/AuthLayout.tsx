import { LandingLogo } from '@/icons/logo';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full h-screen">
      <section className="basis-1/2 w-full h-full flex justify-center items-center intro-panel-bg">
        <LandingLogo />
      </section>
      <section className="basis-1/2 w-full h-full flex justify-center items-center">
        {children}
      </section>
    </div>
  );
};

export default AuthLayout;
