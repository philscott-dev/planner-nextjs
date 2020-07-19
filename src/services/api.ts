import fetch from 'isomorphic-unfetch'

const baseUrl = 'https://cat-fact.herokuapp.com'

export default (url: string) => fetch(baseUrl + url).then((res) => res.json())
