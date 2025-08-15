# 🚀 GitHub Pages 部署指南

## 📋 前置要求

1. 确保您的项目已经推送到GitHub仓库
2. 仓库必须是公开的（免费用户）或您有GitHub Pro订阅
3. 确保您有仓库的管理权限

## ⚙️ 配置步骤

### 1. 更新 package.json

**重要**: 请将 `your-username` 替换为您的实际GitHub用户名：

```json
{
  "homepage": "https://your-username.github.io/react-weather"
}
```

### 2. 启用 GitHub Pages

1. 进入您的GitHub仓库
2. 点击 `Settings` 标签页
3. 在左侧菜单中找到 `Pages`
4. 在 `Source` 部分选择 `GitHub Actions`

### 3. 推送代码触发部署

```bash
git add .
git commit -m "Add GitHub Pages deployment configuration"
git push origin main
```

## 🔄 自动部署流程

GitHub Actions 工作流会在以下情况自动触发：

- 推送到 `main` 或 `master` 分支
- 创建 Pull Request
- 手动触发工作流

### 工作流步骤：

1. **构建阶段**:
   - 检出代码
   - 安装依赖
   - 构建项目
   - 上传构建产物

2. **部署阶段**:
   - 部署到 GitHub Pages
   - 提供部署URL

## 📱 访问您的应用

部署成功后，您的应用将在以下地址可用：

```
https://your-username.github.io/react-weather
```

## 🛠️ 手动部署（可选）

如果您想手动部署，可以运行：

```bash
npm run deploy
```

## 🔍 故障排除

### 常见问题：

1. **404错误**: 检查 `homepage` 字段是否正确
2. **构建失败**: 查看 GitHub Actions 日志
3. **页面空白**: 确保所有依赖都已正确安装

### 检查部署状态：

1. 进入仓库的 `Actions` 标签页
2. 查看最新的工作流运行状态
3. 检查构建和部署日志

## 📚 相关资源

- [GitHub Pages 文档](https://pages.github.com/)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [React 部署指南](https://create-react-app.dev/docs/deployment/)

## ⚠️ 注意事项

- 首次部署可能需要几分钟时间
- 确保您的API密钥不会暴露在公共仓库中
- 考虑使用环境变量来管理敏感信息
- 免费用户每月有构建时间限制
