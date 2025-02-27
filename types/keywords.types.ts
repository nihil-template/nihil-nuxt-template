export interface CreateKeyword {
  subCategoryId: string;
  keywords: string[];
}

export interface KeywordsSearchParams {
  search: string;
}

export interface SearchKeyword {
  subCategoryId: string;
  keyword: string;
}

export interface UpdateKeyword {
  keyword?: string;
}

export interface DeleteKeyword {
  id: string;
}

export interface DeletesKeywords {
  ids: string[];
}
