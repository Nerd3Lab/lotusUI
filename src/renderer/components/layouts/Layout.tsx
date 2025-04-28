import MainLayout from './MainLayout';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full h-screen relative">
      <MainLayout>{children}</MainLayout>
    </div>
  );
};

export default Layout;
