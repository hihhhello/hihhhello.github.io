import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LoadingPage } from 'shared/ui';

export const withRouter = (component: () => React.ReactNode) => () =>
  (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>{component()}</Suspense>
    </BrowserRouter>
  );
