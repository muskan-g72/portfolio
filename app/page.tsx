import type { Metadata } from 'next';
import SpaceHero from '../components/space-hero/SpaceHero';

export const metadata: Metadata = {
  title: 'Muskan',
  description: 'I build software that holds up under load, from the interface to the infrastructure.'
};

export default function Page() {
  return <SpaceHero />;
}
