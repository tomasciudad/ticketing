import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // We are on the server

    return axios.create({
      baseURL: 'http://www.ticketing-lections.online',
      headers: req.headers
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseUrl: '/'
    });
  }
};//ingress-nginx-controller.ingress-nginx.svc.cluster.local
