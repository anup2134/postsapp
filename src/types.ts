export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};
export interface PostsState {
  posts: Post[][];
  currPage: number;
  activePosts: Post[];
  loading: boolean;
}
