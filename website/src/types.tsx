export interface Token {
  tokenId: string;
  name: string;
  image: string;
}

export interface SavedCollection {
  slug: string;
  tokens: Token[];
}
