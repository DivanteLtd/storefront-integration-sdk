import { Router } from 'express';

export default ({config, db}) => {
  const reviewApi = Router();

  reviewApi.post('/create', (req, res) => {
  })

  return reviewApi
}
