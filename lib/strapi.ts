import { GraphQLClient } from "graphql-request";

export interface RequestHeaders {
  [key: string]: string;
}

export function request(query: string, variables: object, includeDrafts: boolean = false) {
  const headers: RequestHeaders = {
    Authorization: `Bearer ${process.env.API_KEY}`,
  };

  // @todo Zaimplementować podgląd w Strapi
  if (includeDrafts) headers['X-Include-Drafts'] = 'true';

  const client = new GraphQLClient(process.env.API_ENDPOINT || '', { headers });

  return client.request(query, variables);
}

export const mediaUrl = (url: string|undefined) => `${process.env.NEXT_PUBLIC_MEDIA_URL}${url}`;
