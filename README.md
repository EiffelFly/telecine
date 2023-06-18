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

## Scene

A Scene is the basic element of the Telecine framework. 


```ts
import { record, initTelecine } from "telecine"

async function recordYourFirstVideo(){
  const { context, scene, browser, page, saveVideo } = initTelecine({
    baseUrl: "https://localhost:3000",
    headless: false
    size: {
      width: 1920,
      height: 1080,
    },
    videoPath: path.resolve(".", "videos"),
  });

  await scene("This is the first scene", async () => {
    await page.goto("/");
    await page.waitForTimeout(2000);  
    await saveVideo();
    await context.close();
    await browser.close();
  }, {
    caption: "We are going to another page"
    timeSpan: 5 * 1000 // 5 seconds
  })
}
```

## Adaptor

The Adaptor is a way to provide a tested and unified action framework for a specific framework under the context of Telecine. Here are the adaptors that we provide right now.

- react-select
