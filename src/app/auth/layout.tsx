import AuthLayout from '@/components/layouts/AuthLayout';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
