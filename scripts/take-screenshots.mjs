import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const targetDir = path.resolve("public/screenshots");
const artifactDir = "C:\\Users\\sawraj g\\.gemini\\antigravity\\brain\\9d603f56-5a76-423e-aad1-be77ce11d2fa";

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function run() {
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop 1440x900
  {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.waitForTimeout(2000); // Allow animations & WebGL to settle
    const dest = path.join(targetDir, "hero-desktop-1440.png");
    await page.screenshot({ path: dest, clip: { x: 0, y: 0, width: 1440, height: 900 } });
    console.log("Saved desktop screenshot to", dest);
    // Copy to artifact dir
    fs.copyFileSync(dest, path.join(artifactDir, "hero-desktop-1440.png"));
    await page.close();
  }

  // 2. Mobile 390x844
  {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);
    const dest = path.join(targetDir, "hero-mobile-390.png");
    await page.screenshot({ path: dest, clip: { x: 0, y: 0, width: 390, height: 844 } });
    console.log("Saved mobile screenshot to", dest);
    // Copy to artifact dir
    fs.copyFileSync(dest, path.join(artifactDir, "hero-mobile-390.png"));
    await page.close();
  }

  await browser.close();
  console.log("Screenshots completed successfully.");
}

run().catch((err) => {
  console.error("Screenshot error:", err);
  process.exit(1);
});
