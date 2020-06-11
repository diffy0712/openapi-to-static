export interface Article {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
  createdAt: number;
  updatedAt?: string;
  slug: string;
}
