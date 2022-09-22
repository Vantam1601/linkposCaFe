import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/old/stores';

export function useTypedDispatch(): AppDispatch {
    return useDispatch<AppDispatch>();
}
