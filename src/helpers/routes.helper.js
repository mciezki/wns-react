import { include } from 'named-urls';

export const routes = {
    home: '/',
    register: '/register',
    test: '/test',
    article: include('/articles/', {
        self: '',
        addArticle: 'add/',
        oneArticle: ':uid/'
    })
}