# ピティナニュースMCPサーバー

全日本ピアノ指導者協会（ピティナ）の最新ニュースを取得するためのMCPサーバー。

### Local Installation

```bash
git clone https://github.com/yourusername/ptna-news-mcp.git
cd ptna-news-mcp

npm install

npm run build
```

## Claude for Desktopでの設定

Claude for Desktopの設定ファイル（`~/Library/Application Support/Claude/claude_desktop_config.json`）に以下を追加:

### local
```bash
git clone https://github.com/yourusername/ptna-news-mcp.git
cd ptna-news-mcp

npm install

npm run build
```

```json
{
  "mcpServers": {
    "ptna-news": {
      "command": "node",
      "args": ["<cloned path>/dist/index.js"]
    }
  }
}
```

### npx
```json
{
  "mcpServers": {
    "ptna-news": {
      "command": "npx",
      "args": ["mcp-ptna-news"]
    }
  }
}
```

## 機能

- 全日本ピアノ指導者協会（ピティナ）の最新ニュースの取得
- カテゴリーによるフィルタリング（例：コンペティション、コンサート）
- 取得件数の制限

## 使用例

Claude for Desktopで以下のような質問ができます:

- ピティナの最新ニュースを教えて
- コンペティション関連のピティナニュースを3件取得して
- コンサートカテゴリーのニュースはある？

## ライセンス

MIT
