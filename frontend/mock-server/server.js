const express = require('express');
const cors = require('cors');
const app = express();

// 使用中间件
app.use(cors());
app.use(express.json());

// 存储token使用记录的内存数据库
let tokenUsages = [];
let userBalances = {
  // 初始化一些测试数据
  'user123': 1000,
  'user456': 500
};

// 记录token使用
app.post('/api/v1/token/record', (req, res) => {
  const { user_id, model_id, tokens } = req.body;
  
  if (!user_id || !model_id || !tokens) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // 记录使用情况
  tokenUsages.push({
    user_id,
    model_id,
    tokens,
    timestamp: new Date().toISOString()
  });

  // 更新用户余额
  if (userBalances[user_id]) {
    userBalances[user_id] -= tokens;
  } else {
    userBalances[user_id] = -tokens;
  }

  res.json({ success: true });
});

// 获取用户token使用记录
app.get('/api/v1/token/usage', (req, res) => {
  const { user_id } = req.query;
  
  if (!user_id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const userUsages = tokenUsages.filter(usage => usage.user_id === user_id);
  const balance = userBalances[user_id] || 0;

  res.json({
    usages: userUsages,
    balance: balance
  });
});

// 添加测试路由
app.get('/test/reset', (req, res) => {
  tokenUsages = [];
  userBalances = {
    'user123': 1000,
    'user456': 500
  };
  res.json({ message: 'Test data reset successfully' });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
});
