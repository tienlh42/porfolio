export type Project = {
  id: number | string;
  title: string;
  desc?: string;
  duration?: string;
  author?: string;
  rating?: number;
  tags?: string[];
  thumbnail_image?: string;
  images?: string[];
};
