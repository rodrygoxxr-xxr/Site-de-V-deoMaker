// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const mobileMenuStabilityFix = {
  name: "mobile-menu-stability-fix",
  enforce: "post" as const,
  transform(code: string, id: string) {
    if (!id.replaceAll("\\", "/").endsWith("/src/routes/index.tsx")) {
      return null;
    }

    return code
      // A backdrop-filter on the fixed header creates a containing block for the
      // fixed mobile drawer, which makes the drawer inherit the header's bounds
      // after scrolling. Keep the header solid so the drawer remains viewport-fixed.
      .replace(
        "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1a1a1a]",
        "bg-[#0a0a0a] border-b border-[#1a1a1a]"
      )
      // The menu overlay must darken the page without applying any blur.
      .replace("bg-black/60 backdrop-blur-[2px]", "bg-black/60")
      // Make the drawer explicitly viewport-height based on mobile browsers' dynamic viewport.
      .replace(
        "fixed top-0 right-0 bottom-0 z-[60]",
        "fixed inset-y-0 right-0 z-[60] h-[100dvh] max-h-[100dvh]"
      );
  },
};

export default defineConfig({
  vite: {
    plugins: [mobileMenuStabilityFix],
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
