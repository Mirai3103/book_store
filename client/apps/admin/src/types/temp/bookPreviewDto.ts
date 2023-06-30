import { AuthorDto } from './authorDto';

export interface BookPreviewDto {
    id: number;
    title: string;
    name: string;
    slug: string;
    author: AuthorDto | null;
    price: number;
    episode: string | null;
    thumbnailUrl: string;
    createdAt: string;
}