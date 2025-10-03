import { theme } from '@/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderOptions } from '@testing-library/react';
import { type ReactElement } from 'react';
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom';

interface AppProvidersProps {
  children: React.ReactNode;
  routerProps?: MemoryRouterProps;
}

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: Infinity,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

export function AppProviders({ children, routerProps }: AppProvidersProps) {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <MemoryRouter {...routerProps}>{children}</MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  routerProps?: MemoryRouterProps;
}

export function renderWithProviders(ui: ReactElement, { routerProps, ...options }: CustomRenderOptions = {}) {
  return render(ui, {
    wrapper: ({ children }) => <AppProviders routerProps={routerProps}>{children}</AppProviders>,
    ...options,
  });
}

export * from '@testing-library/react';
export { renderWithProviders as render };
