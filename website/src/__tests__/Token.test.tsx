import { isSameToken } from "../utils/token";

const token1 = {
  contract: "0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63",
  tokenId: "637",
  image:
    "https://api.reservoir.tools/assets/v1?asset=d13dd00e722beffaf6c818fc35b7e75a4d939d5263d3745a5224442b6e0672f4b8bcc975a20ee847ce2961ce204afc5576ef18a6d76939ade2f1eb16e877113bd8604e9cb17b8e5c1deefcc3799fe0dcf8a2a8ce21f0f90b8c9bc8876b008f8ecaa341c961ade0da11b878042811153f8a404350a1cf1300dedff8c8f6f59737e1c36adca3539e5ec9b326e73d154fcd9d90547028f7a3eab3abf92c17a43f5a",
};

const token2 = {
  contract: "0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63",
  tokenId: "637",
  image:
    "https://api.reservoir.tools/assets/v1?asset=d13dd00e722beffaf6c818fc35b7e75a4d939d5263d3745a5224442b6e0672f4b8bcc975a20ee847ce2961ce204afc5576ef18a6d76939ade2f1eb16e877113bd8604e9cb17b8e5c1deefcc3799fe0dcf8a2a8ce21f0f90b8c9bc8876b008f8ecaa341c961ade0da11b878042811153f8a404350a1cf1300dedff8c8f6f59737e1c36adca3539e5ec9b326e73d154fcd9d90547028f7a3eab3abf92c17a43f5a",
};

const token3 = {
  contract: "0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff65",
  tokenId: "637",
  image:
    "https://api.reservoir.tools/assets/v1?asset=d13dd00e722beffaf6c818fc35b7e75a4d939d5263d3745a5224442b6e0672f4b8bcc975a20ee847ce2961ce204afc5576ef18a6d76939ade2f1eb16e877113bd8604e9cb17b8e5c1deefcc3799fe0dcf8a2a8ce21f0f90b8c9bc8876b008f8ecaa341c961ade0da11b878042811153f8a404350a1cf1300dedff8c8f6f59737e1c36adca3539e5ec9b326e73d154fcd9d90547028f7a3eab3abf92c17a43f5a",
};

const token4 = {
  contract: "0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63",
  tokenId: "12",
  image:
    "https://api.reservoir.tools/assets/v1?asset=d13dd00e722beffaf6c818fc35b7e75a4d939d5263d3745a5224442b6e0672f4b8bcc975a20ee847ce2961ce204afc5576ef18a6d76939ade2f1eb16e877113bd8604e9cb17b8e5c1deefcc3799fe0dcf8a2a8ce21f0f90b8c9bc8876b008f8ecaa341c961ade0da11b878042811153f8a404350a1cf1300dedff8c8f6f59737e1c36adca3539e5ec9b326e73d154fcd9d90547028f7a3eab3abf92c17a43f5a",
};

describe("isSameToken()", () => {
  test("same contract and same token id", () => {
    expect(isSameToken(token1, token2)).toBe(true);
  });
  test("same contract but different token id", () => {
    expect(isSameToken(token1, token3)).toBe(false);
  });
  test("same token id but different contract", () => {
    expect(isSameToken(token2, token3)).toBe(false);
  });
  test("different token id and contract", () => {
    expect(isSameToken(token3, token4)).toBe(false);
  });
});
