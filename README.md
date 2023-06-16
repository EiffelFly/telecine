# Telecine

Telecine is a record video as code framework. It uses Playwright under the hood to let you programmatically record every video about your product. 

## Installation

```bash
npm install telecine playwright
```

## Usage

### Basic

```ts
import { record, initTelecine } from "telecine"

async function recordYourFirstVideo(){
  const { context, browser, page, saveVideo } = initTelecine({
    baseUrl: "https://localhost:3000",
    headless: false
    size: {
      width: 1920,
      height: 1080,
    },
    videoPath: path.resolve(".", "videos"),
  });

  await page.goto("/");
  await page.waitForTimeout(2000);  
  await saveVideo();
  await context.close();
  await browser.close();
}
```

### Actions

#### Click

To record a click action pair with a cursor, you need to use Telecine click function.

```ts
```

### Cursor

We support adding cursor on the recorded video 

