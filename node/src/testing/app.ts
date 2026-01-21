import express from 'express';

const app = express();

app.get('/ping', (req, res) => {
  res.json({ ok: true });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app; 
