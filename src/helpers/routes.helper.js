import { include } from 'named-urls';

export const routes = {
    home: '/',
    register: '/register',
    test: '/test',
    addArticle: '/add',
    articles: include('/articles/', {
        self: '',
        technology: 'technology/',
        lifeStyle: 'life-style/',
        games: 'games/',
        health: 'health/',
        politics: 'politics/',
        tragedies: 'tragedies/',
        fun: 'fun/'
    }),
    article: '/article/:uid'
}