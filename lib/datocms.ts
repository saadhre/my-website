import { GraphQLClient } from "graphql-request";
import type { RawRequestOptions } from "graphql-request";

export interface RequestArgs extends RawRequestOptions {
  includeDrafts?: boolean;
  excludeInvalid?: boolean;
}

export interface RequestHeaders {
  [key: string]: string;
}

export function request(args: RequestArgs) {
  const { query, variables, includeDrafts, excludeInvalid } = args;

  const headers: RequestHeaders = {
    authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
  };

  if (includeDrafts) headers['X-Include-Drafts'] = 'true';
  if (excludeInvalid) headers['X-Exclude-Invalid'] = 'true';

  const client = new GraphQLClient('https://graphql.datocms.com', { headers });

  return client.request(query, variables);
}
