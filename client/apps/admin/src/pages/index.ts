import { default as AuthorRoute } from './Author';
import { default as CategoryRoute } from './Category';
import { default as PublisherRoute } from './Publisher';
import { default as ProviderRoute } from './Provider';

const router = [
  ...AuthorRoute,
  ...CategoryRoute,
  ...PublisherRoute,
  ...ProviderRoute,
];

export default router;
