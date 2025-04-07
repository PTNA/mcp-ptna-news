# PTNA News MCP Server

An MCP server for retrieving the latest news from the Piano Teachers National Association of Japan (PTNA).

### Local Installation

```bash
git clone https://github.com/yourusername/ptna-news-mcp.git
cd ptna-news-mcp

npm install

npm run build
```

## Configuration for Claude for Desktop

Add the following to the Claude for Desktop configuration file (`~/Library/Application Support/Claude/claude_desktop_config.json`):

### Local Setup
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

### Using npx
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

## Features

- Retrieve the latest news from the Piano Teachers National Association of Japan (PTNA)
- Filter news by category (e.g., competitions, concerts)
- Limit the number of news items to retrieve

## Usage Examples

You can ask Claude for Desktop questions like:

- Get the latest PTNA news
- Retrieve 3 news items related to competitions from PTNA
- Are there any news items in the concert category?

## License

MIT
