# Telecine

Telecine is a record video as code framework. It uses Playwright under the hood to let you programmatically record every video about your product. 

## Installation

```bash
npm install telecine playwright
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

## Action

Playwright's foundation is the Action. It is a way to describe what you want to do in the browser. Here are the Playwright actions we support.

- Fill
- Check
- SelectOption
- Click
- Type
- Press
- SetInputFiles
- Focus
- DragTo
- Hover


```ts
import { record, initTelecine } from "telecine"

async function recordYourFirstVideo(){
  const { context, scene, browser, page, saveVideo, click } = initTelecine({
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
    
    await click(page.locator("data-testid=button"));

    await saveVideo();
    await context.close();
    await browser.close();
  }, {
    caption: "We are going to another page"
    timeSpan: 5 * 1000 // 5 seconds
  })
}
```


## Adaptor (community-maintained complex actions)

The Adaptor is a way to provide a tested and unified action framework for a specific framework under the context of Telecine. You can use the API it provided. Here are the adaptors that we plan to provide:

- react-select
- radix-ui/react-select
- radix-ui/react-hover-card
- react-flow

```ts
import { record, initTelecine } from "telecine"
import { reactSelectAdaptor } from "telecine/adaptors"

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
    
    const selectLocator = page.locator("data-testid=select-locator")
    const optionLocator = page.locator("data-testid=option1")

    reactSelectAdaptor.openAndSelect(page, selectLocator, optionLocator);

    await context.close();
    await browser.close();
  }, {
    caption: "We are going to another page"
    timeSpan: 5 * 1000 // 5 seconds
  })
}
```