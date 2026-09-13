// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const mobileMenuFix = {
  name: "mobile-menu-fix",
  enforce: "pre" as const,
  transform(code: string, id: string) {
    const normalizedId = id.replaceAll("\\", "/");

    if (normalizedId.endsWith("/src/routes/index.tsx")) {
      const menuStart = code.indexOf("        {/* Mobile Overlay */}");
      const headerEnd = menuStart === -1 ? -1 : code.indexOf("      </header>", menuStart);
      const heroMarker = "      {/* Hero Section */}";

      if (menuStart !== -1 && headerEnd !== -1 && code.includes(heroMarker)) {
        // The menu must live outside the fixed header. A fixed descendant of an ancestor
        // using backdrop-filter can lose viewport positioning and become tied to the header.
        let menu = code.slice(menuStart, headerEnd);

        menu = menu
          .replace(/backdrop-blur-md/g, "")
          .replace(/backdrop-blur-\[2px\]/g, "")
          .replace(
            "fixed inset-0 z-[55] bg-black/60",
            "fixed inset-0 z-[90] bg-black/60"
          )
          .replace(
            "fixed top-0 right-0 bottom-0 z-[60] w-[min(85vw,360px)]",
            "fixed inset-y-0 right-0 z-[100] h-[100dvh] max-h-[100dvh] w-[min(85vw,360px)]"
          )
          .replace(
            "<nav className=\"flex h-full flex-col p-6 pt-24 gap-6 overflow-y-auto\">",
            "<button type=\"button\" onClick={() => setMobileMenuOpen(false)} aria-label=\"Fechar menu\" className=\"absolute top-5 right-5 z-10 p-2 text-[#aaa] hover:text-[#faf9f7] transition-colors\"><X size={24} /></button>\n          <nav className=\"flex h-full flex-col p-6 pt-24 gap-6 overflow-y-auto\">"
          );

        const codeWithoutMenu = code.slice(0, menuStart) + code.slice(headerEnd);
        const menuOutsideHeader = `${menu}\n\n`;
        return codeWithoutMenu.replace(heroMarker, `${menuOutsideHeader}${heroMarker}`);
      }

      // Safety fallback: even if the menu extraction pattern changes, remove blur from
      // the mobile layers and keep the drawer viewport-sized.
      return code
        .replace(/backdrop-blur-md/g, "")
        .replace(/backdrop-blur-\[2px\]/g, "")
        .replace(
          "fixed top-0 right-0 bottom-0 z-[60] w-[min(85vw,360px)]",
          "fixed inset-y-0 right-0 z-[100] h-[100dvh] max-h-[100dvh] w-[min(85vw,360px)]"
        );
    }

    if (normalizedId.endsWith("/src/styles.css")) {
      return code
        .replace(
          'button[aria-label="Fechar menu"] {',
          'header > div button[aria-label="Fechar menu"] {'
        )
        .replace(
          'button[aria-label="Fechar menu"]:hover',
          'header > div button[aria-label="Fechar menu"]:hover'
        );
    }

    return null;
  },
};

export default defineConfig({
  vite: {
    plugins: [mobileMenuFix],
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
  },
});
