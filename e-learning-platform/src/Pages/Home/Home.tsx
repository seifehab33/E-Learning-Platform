import React, { Suspense } from "react";
import SpinnerFallback from "../../components/SpinnerFallback/SpinnerFallback";

const MainHomeLayout = React.lazy(() => import("./Layout/MainHomeLayout"));

const Home: React.FC = () => (
  <section>
    <Suspense fallback={<SpinnerFallback />}>
      <MainHomeLayout />
    </Suspense>
  </section>
);

export default Home;
