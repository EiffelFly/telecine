import { chromium } from "playwright";
import {
  InstallCaptionHelperConfig,
  installCaptionHelper,
} from "./installCaptionHelper";
import { installMouseHelper } from "./installMouseHelper";

export type initTelecineConfig = {
  baseURL: string;
  headless: boolean;
  videoName: string;
  videoPath: string;
  size: {
    width: number;
    height: number;
  };
  captionConfig: InstallCaptionHelperConfig;
};

export async function initTelecine(config: initTelecineConfig) {
  const { baseURL, headless, videoName, videoPath, size, captionConfig } =
    config;

  const browser = await chromium.launch({
    headless,
  });

  const context = await browser.newContext({
    recordVideo: {
      dir: videoPath,
      size: size,
    },
    viewport: size,
    baseURL,
  });

  const page = await context.newPage();

  await installCaptionHelper(page, captionConfig);
  await installMouseHelper(page);

  async function saveVideo() {
    const video = page.video();

    if (video) {
      video.saveAs(`${videoPath}/${videoName}.webm`);
      video.delete();
    }
  }

  return {
    context,
    browser,
    page,
    saveVideo,
  };
}
