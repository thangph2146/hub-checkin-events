import dynamic from 'next/dynamic';
import LoadingFallback from './components/LoadingFallback';

const ConsoleClient = dynamic(() => import('./ConsoleClient'), {
  loading: () => (
    <LoadingFallback />
  )
});


export default function ConsolePage(): JSX.Element {
  return <ConsoleClient />;
} 