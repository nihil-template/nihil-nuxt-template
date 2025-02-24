import { HttpStatusCode } from 'axios';

export type ApiResponse<T> = {
  resData: T;
  message: string;
};

export type ApiError = {
  resData: null;
  message: string;
};

export interface CreateResponse<T> {
  type: 'success' | 'error';
  resData: T;
  message: string;
  status: keyof typeof HttpStatusCode;
}

export interface SiteMetadata {
  title: string;
  url?: string;
  description?: string;
  author?: string;
  keywords?: string;
  type?: 'website' | 'article';
  tags?: string;
  section?: string;
  created?: string;
  updated?: string;
  image?: {
    link: string;
    alt: string;
  };
}

export interface SiteConfig {
  title: string;
  description: string;
  url: string;
  type: 'website' | 'article';
  image: {
    link: string;
    alt: string;
  };
  keywords: string;
  author: {
    name: string;
    url: string;
  };
  version: string;
  googleVerfi: string;
  googleAdSrc: string;
  googleAnalyticsId: string;
  isBaseUrl: string;
}
