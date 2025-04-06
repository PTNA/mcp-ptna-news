# ピティナニュースMCPサーバー

全日本ピアノ指導者協会（ピティナ）の最新ニュースを取得するためのMCPサーバー。

## インストール方法

### npxで直接実行する

```bash
npx ptna-news-mcp
```

### グローバルインストール

```bash
npm install -g ptna-news-mcp
ptna-news-mcp
```

### ローカルでの開発

```bash
# リポジトリをクローン
git clone https://github.com/yourusername/ptna-news-mcp.git
cd ptna-news-mcp

# 依存関係のインストール
npm install

# 開発中の実行
npm start
```

## Claude for Desktopでの設定

Claude for Desktopの設定ファイル（`~/Library/Application Support/Claude/claude_desktop_config.json`）に以下を追加:

```json
{
  "mcpServers": {
    "ptna-news": {
      "command": "npx",
      "args": ["ptna-news-mcp"]
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

## NPMへの公開方法

このパッケージをNPMに公開する場合は以下の手順に従ってください：

1. NPMアカウントを作成/ログイン
```bash
npm login
```

2. パッケージの公開
```bash
npm publish
```

## ライセンス

MIT
