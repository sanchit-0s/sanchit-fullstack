import { collectDefaultMetrics, register } from 'prom-client';

collectDefaultMetrics();

export const getMetrics = async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
};
