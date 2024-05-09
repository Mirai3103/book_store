import { default as AuthorRoute } from './Author';
import { default as CategoryRoute } from './Category';
import { default as PublisherRoute } from './Publisher';
import { default as ProviderRoute } from './Provider';
import { default as SeriesRoute } from './Series';
import { default as BookRoute } from './Book';
import { default as TestRoute } from './Test';
import { default as OrderRoute } from './Order';

const router = [
  ...AuthorRoute,
  ...CategoryRoute,
  ...PublisherRoute,
  ...ProviderRoute,
  ...SeriesRoute,
  ...BookRoute,
  ...TestRoute,
  ...OrderRoute,
];

export default router;
