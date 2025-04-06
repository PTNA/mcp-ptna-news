#!/usr/bin/env node
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
    {
      category: z.string().optional().describe(
        "ニュースカテゴリー（例: コンペティション、コンサート等）によるフィルター\n" +
        "- コンペティション: ピアノコンペティション関連情報\n" +
        "- 提携コンクール: 提携している他団体のコンクール情報\n" +
        "- コンサート: 演奏会、リサイタル情報\n" +
        "- セミナー: 講座、勉強会情報\n" +
        "- 調査・研究: 音楽研究、楽譜情報等\n" +
        "- ステップ: ピティナ・ピアノステップ関連情報\n" +
        "- 指導者ライセンス: 指導者資格関連情報\n" +
        "- 寄付・CrossGiving: 寄付活動報告\n" +
        "- コーポレート: 協会活動、組織情報\n" +
        "- 今週のコラム: 専務理事（福田成康）による定期コラム\n" +
        "- OPEN PIANO PROJECT: OPEN PIANO PROJECT\n" +
        "- 教室紹介: ピアノ教室紹介関連情報"
      ),
      limit: z.number().optional().default(10).describe("取得するニュース件数（デフォルト10件）"),
    },
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

  const transport = new StdioServerTransport();
  await server.connect(transport);

  // ログにサーバー起動を記録（標準エラー出力には書き込み可能）
  console.error("ピティナニュースMCPサーバーが起動しました");
}

main().catch(error => {
  console.error("サーバー起動エラー:", error);
  process.exit(1);
});