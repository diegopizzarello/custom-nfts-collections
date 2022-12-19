export interface Token {
  contract: string;
  tokenId: string;
  image: string;
}

export interface SavedCollection {
  slug: string;
  tokens: Token[];
}
