import fetch from 'isomorphic-unfetch'

const baseUrl = 'https://cat-fact.herokuapp.com'

export default function fetcher(url: string) {
  return fetch(baseUrl + url).then((res) => res.json())
}
