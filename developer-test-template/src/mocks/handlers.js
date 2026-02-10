import { http, HttpResponse } from 'msw';
// example
export const handlers = [
  http.get('/user', () => {
    return HttpResponse.json({ name: 'John Maverick' });
  }),
];
