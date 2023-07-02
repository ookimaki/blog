import Container from "@/components/container";
import Header from "@/components/header";
import type View from "@/interfaces/layout-view";

type Props = {
  view: View;
  children: React.ReactNode;
};

const Layout = ({ view, children }: Props) => {
  return (
    <div className="min-h-screen">
      <main>
        <Container>
          <Header view={view} />
          {children}
        </Container>
      </main>
    </div>
  );
};

export default Layout;
