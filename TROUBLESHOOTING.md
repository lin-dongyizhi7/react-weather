# 🔧 GitHub Actions 构建故障排除指南

## 🚨 当前问题

构建失败，错误信息：`Could not find a required file. Name: index.html`

## 🔍 问题分析

### 可能的原因：

1. **文件路径问题**: GitHub Actions在Linux环境中运行，可能存在路径差异
2. **缓存问题**: npm或GitHub Actions缓存可能损坏
3. **依赖问题**: 某些依赖包可能不兼容
4. **权限问题**: 文件权限或访问权限问题
5. **homepage配置**: package.json中的homepage字段可能有问题

## 🛠️ 解决方案

### 方案1: 清理缓存和重新安装

```bash
# 清理所有缓存
rm -rf node_modules
rm -rf build
rm package-lock.json

# 重新安装依赖
npm install

# 测试构建
npm run build
```

### 方案2: 检查文件结构

确保以下文件存在且内容正确：

```
react-weather/
├── public/
│   ├── index.html          # ✅ 必须存在
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── index.tsx           # ✅ 必须存在
│   ├── App.tsx
│   └── components/
└── package.json
```

### 方案3: 修改工作流配置

在 `.github/workflows/deploy.yml` 中添加调试步骤：

```yaml
- name: Debug - List files
  run: |
    echo "Current directory:"
    pwd
    echo "Directory contents:"
    ls -la
    echo "Public directory contents:"
    ls -la public/
    echo "Src directory contents:"
    ls -la src/
```

### 方案4: 使用不同的Node.js版本

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '16'  # 尝试使用Node.js 16
    cache: 'npm'
```

### 方案5: 分步构建

```yaml
- name: Install dependencies
  run: npm ci

- name: Check files
  run: |
    ls -la
    ls -la public/
    ls -la src/

- name: Build project
  run: |
    echo "Starting build..."
    npm run build
    echo "Build completed"
    ls -la build/
```

## 🔄 测试步骤

### 1. 本地测试

```bash
# 确保本地构建正常
npm run build

# 检查构建输出
ls -la build/
cat build/index.html
```

### 2. 创建测试分支

```bash
git checkout -b test-build
git add .
git commit -m "Test build configuration"
git push origin test-build
```

### 3. 手动触发工作流

1. 进入GitHub仓库
2. 点击 `Actions` 标签页
3. 选择 `Test Build` 工作流
4. 点击 `Run workflow`

## 📋 检查清单

- [ ] 本地构建是否成功？
- [ ] 所有必需文件是否存在？
- [ ] 文件权限是否正确？
- [ ] 依赖版本是否兼容？
- [ ] 工作流配置是否正确？
- [ ] 是否有缓存问题？

## 🆘 紧急解决方案

如果问题持续存在，可以尝试：

1. **重新创建仓库**: 克隆到新仓库
2. **使用不同的构建工具**: 尝试Vite或Next.js
3. **手动部署**: 使用gh-pages手动部署
4. **联系GitHub支持**: 报告可能的平台问题

## 📚 相关资源

- [GitHub Actions 故障排除](https://docs.github.com/en/actions/troubleshooting)
- [Create React App 部署问题](https://create-react-app.dev/docs/troubleshooting)
- [React 构建问题](https://reactjs.org/docs/error-boundaries.html)

## 📞 获取帮助

如果以上方案都无法解决问题，请：

1. 检查GitHub Actions的完整日志
2. 在GitHub Issues中搜索类似问题
3. 在Stack Overflow上提问
4. 联系项目维护者
