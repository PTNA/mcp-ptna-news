import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

/**
 * ピティナニュースの記事を表す型
 */
type NewsItem = {
  title: string;
  author: string;
  url: string;
  datetime: string;
  description: string;
};

/**
 * メイン関数 - MCPサーバーの初期化と起動
 */
async function main() {
  // MCPサーバーの初期化
  const server = new McpServer({
    name: "ptna-news-server",
    version: "1.0.0",
  });

  // ピティナニュース取得ツールの登録
  server.tool(
    "get_ptna_news",
    "全日本ピアノ指導者協会（ピティナ）の最新ニュースを取得します",
    // パラメータスキーマ - オプショナルでカテゴリーによるフィルタリング可能
    {
      category: z.string().optional().describe("ニュースカテゴリー（例: コンペティション、コンサート等）によるフィルター"),
      limit: z.number().optional().default(10).describe("取得するニュース件数（デフォルト10件）"),
    },
    // ツール実行関数
    async ({ category, limit = 10 }) => {
      try {
        // ピティナのニュースフィードを取得
        const response = await fetch("https://www.piano.or.jp/feeds.json");

        if (!response.ok) {
          return {
            isError: true,
            content: [{
              type: "text",
              text: `APIリクエストエラー: ${response.status} ${response.statusText}`
            }]
          };
        }

        const news = await response.json() as NewsItem[];
        let filteredNews = category
          ? news.filter(item => item.author.includes(category))
          : news;

        // 件数を制限
        filteredNews = filteredNews.slice(0, limit);

        const formattedNews = filteredNews.map(item => {
          const date = new Date(item.datetime).toLocaleString('ja-JP');
          return `【${item.author}】${item.title}\n日時: ${date}\nURL: ${item.url}\n${item.description ? `概要: ${item.description}` : ''}`;
        }).join("\n\n---\n\n");

        const summary = `全${filteredNews.length}件のニュースを取得しました。${category ? `カテゴリー「${category}」でフィルター。` : ''}`;

        return {
          content: [{
            type: "text",
            text: `${summary}\n\n${formattedNews}`
          }]
        };
      } catch (error) {
        return {
          isError: true,
          content: [{
            type: "text",
            text: `ニュース取得中にエラーが発生しました: ${error instanceof Error ? error.message : String(error)}`
          }]
        };
      }
    }
  );

  // トランスポートの設定と接続
  const transport = new StdioServerTransport();
  await server.connect(transport);

  // ログにサーバー起動を記録（標準エラー出力には書き込み可能）
  console.error("ピティナニュースMCPサーバーが起動しました");
}

// メイン関数の実行とエラーハンドリング
main().catch(error => {
  console.error("サーバー起動エラー:", error);
  process.exit(1);
});