import { Component, isValidElement } from 'react';

const changedArray = (a: Array<unknown> = [], b: Array<unknown> = []) =>
  a.length !== b.length || a.some((item, index) => !Object.is(item, b[index]));

export interface FallbackProps {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
}

interface ErrorBoundaryPropsWithComponent {
  onResetKeysChange?: (prevResetKeys: Array<unknown> | undefined, resetKeys: Array<unknown> | undefined) => void;
  onReset?: (...args: Array<unknown>) => void;
  onError?: (error: Error, info: { componentStack: string }) => void;
  resetKeys?: Array<unknown>;
  fallback?: never;
  FallbackComponent: React.ComponentType<FallbackProps>;
  fallbackRender?: never;
}

declare function FallbackRender(
  props: FallbackProps,
): React.ReactElement<unknown, string | React.FunctionComponent | typeof Component> | null;

interface ErrorBoundaryPropsWithRender {
  onResetKeysChange?: (prevResetKeys: Array<unknown> | undefined, resetKeys: Array<unknown> | undefined) => void;
  onReset?: (...args: Array<unknown>) => void;
  onError?: (error: Error, info: { componentStack: string }) => void;
  resetKeys?: Array<unknown>;
  fallback?: never;
  FallbackComponent?: never;
  fallbackRender: typeof FallbackRender;
}

interface ErrorBoundaryPropsWithFallback {
  onResetKeysChange?: (prevResetKeys: Array<unknown> | undefined, resetKeys: Array<unknown> | undefined) => void;
  onReset?: (...args: Array<unknown>) => void;
  onError?: (error: Error, info: { componentStack: string }) => void;
  resetKeys?: Array<unknown>;
  fallback: React.ReactElement<unknown, string | React.FunctionComponent | typeof Component> | null;
  FallbackComponent?: never;
  fallbackRender?: never;
}

type ErrorBoundaryProps =
  | ErrorBoundaryPropsWithFallback
  | ErrorBoundaryPropsWithComponent
  | ErrorBoundaryPropsWithRender;

type ErrorBoundaryState = { error: Error | null };

const initialState: ErrorBoundaryState = { error: null };

export class ErrorBoundary extends Component<
  React.PropsWithRef<React.PropsWithChildren<ErrorBoundaryProps>>,
  ErrorBoundaryState
> {
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  state = initialState;
  resetErrorBoundary = (...args: Array<unknown>) => {
    this.props.onReset?.(...args);
    this.reset();
  };

  reset() {
    this.setState(initialState);
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    const componentStack = info.componentStack || '';
    this.props.onError?.(error, { componentStack });
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps, prevState: ErrorBoundaryState) {
    const { error } = this.state;
    const { resetKeys } = this.props;

    // There's an edge case where if the thing that triggered the error
    // happens to *also* be in the resetKeys array, we'd end up resetting
    // the error boundary immediately. This would likely trigger a second
    // error to be thrown.
    // So we make sure that we don't check the resetKeys on the first call
    // of cDU after the error is set

    if (error !== null && prevState.error !== null && changedArray(prevProps.resetKeys, resetKeys)) {
      this.props.onResetKeysChange?.(prevProps.resetKeys, resetKeys);
      this.reset();
    }
  }

  render() {
    const { error } = this.state;

    const { fallbackRender, FallbackComponent, fallback } = this.props;

    if (error !== null) {
      const props = {
        error,
        resetErrorBoundary: this.resetErrorBoundary,
      };
      if (isValidElement(fallback)) {
        return fallback;
      } else if (typeof fallbackRender === 'function') {
        return fallbackRender(props);
      } else if (FallbackComponent) {
        return <FallbackComponent {...props} />;
      } else {
        throw new Error('react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop');
      }
    }

    return this.props.children;
  }
}

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
