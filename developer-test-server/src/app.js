const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');
const questions = require('../data/question.json');
const results = require('../data/result.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// GET /api/questions - 전체 질문 목록
app.get('/api/questions', (req, res) => {
  res.json(questions);
});

// GET /api/questions/:id - 특정 질문
app.get('/api/questions/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const question = questions.find((q) => q.id === id);

  if (!question) {
    return res.status(404).json({ error: '해당 질문을 찾을 수 없습니다.' });
  }

  res.json(question);
});

// GET /api/results/:type - 특정 개발자 타입 결과
app.get('/api/results/:type', (req, res) => {
  const { type } = req.params;
  const result = results[type];

  if (!result) {
    return res.status(404).json({ error: '해당 개발자 타입을 찾을 수 없습니다.' });
  }

  res.json(result);
});

// POST /api/submit - 답변 제출 및 결과 계산
app.post('/api/submit', (req, res) => {
  const { answers } = req.body;

  if (!Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ error: 'answers 배열이 필요합니다.' });
  }

  const validTypes = Object.keys(results);
  const invalidType = answers.find((a) => !validTypes.includes(a));
  if (invalidType) {
    return res.status(400).json({ error: `유효하지 않은 타입입니다: ${invalidType}` });
  }

  // 타입별 빈도수 집계
  const counts = {};
  for (const type of answers) {
    counts[type] = (counts[type] || 0) + 1;
  }

  // 가장 많이 선택된 타입 결정
  let maxType = answers[0];
  let maxCount = 0;
  for (const [type, count] of Object.entries(counts)) {
    if (count > maxCount) {
      maxCount = count;
      maxType = type;
    }
  }

  res.json(results[maxType]);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
