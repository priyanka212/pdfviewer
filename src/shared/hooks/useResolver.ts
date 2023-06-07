import { useCallback, useState } from 'react';

type State<T> =
  | { value: T; error: undefined }
  | { value: false; error: Error }
  | { value: undefined; error: undefined };

type Action<T> =
  | { type: 'RESOLVE'; value: T }
  | { type: 'REJECT'; error: Error }
  | { type: 'RESET' };

export default function useResolver<T>() {
  const [value, setValue] = useState<T>();
  const [error, setError] = useState<Error>();

  const state = { value, error } as State<T>;
  const dispatch = useCallback((action: Action<T>) => {
    switch (action.type) {
      case 'RESOLVE':
        setValue(action.value);
        setError(undefined);
        break;
      case 'REJECT':
        setValue(undefined);
        setError(action.error);
        break;
      case 'RESET':
        setValue(undefined);
        setError(undefined);
        break;
      default:
        break;
    }
  }, []);

  return [state, dispatch] as const;
}
