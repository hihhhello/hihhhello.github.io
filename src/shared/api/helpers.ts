import { AxiosRequestHeaders } from 'axios';
import qs from 'query-string';

type ParseLinkHeaderReturnType = Record<
  string,
  Record<string, string | number>
>;
export const parseLinkHeader = (
  headers: AxiosRequestHeaders
): ParseLinkHeaderReturnType => {
  const linkHeader = headers['link'] as string;
  const links = linkHeader.split(',');
  const linkRel = links.map((link) => link.split(';'));
  const parsedPagination = linkRel.reduce((acc, rel) => {
    const url = rel[0].match('<(.*?)>');
    let query = {};

    // @ts-ignore
    const relName = rel[1].match('"(.*?)"')[1];
    if (url) {
      query = qs.parseUrl(url[1]).query;
    }
    return {
      ...acc,
      [relName]: query,
    };
  }, {});

  return parsedPagination;
};
