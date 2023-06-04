import { Author } from './author';

export interface BookPreviewDto {
    id: number;
    title: string;
    name: string;
    slug: string;
    author: Author | null;
    price: number;
    episode: string | null;
    thumbnailUrl: string;
}