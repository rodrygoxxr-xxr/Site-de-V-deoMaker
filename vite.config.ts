// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const mobileMenuStabilityFix = {
  name: "mobile-menu-stability-fix",
  enforce: "pre" as const,
  transform(code: string, id: string) {
    const normalizedId = id.replaceAll("\\", "/");

    if (normalizedId.endsWith("/src/routes/index.tsx")) {
      return code
        // The mobile/tablet navigation must never inherit a backdrop filter from the header.
        // backdrop-filter can create a containing block and break fixed positioning after scroll.
        .replace(/backdrop-blur-md/g, "")
        .replace(/backdrop-blur-\[2px\]/g, "")
        // Keep the overlay as a plain, full-viewport dark layer: no blur and no geometry dependency.
        .replace(
          "fixed inset-0 z-[55] z-[55] bg-black/60",
          "fixed inset-0 z-[55] bg-black/60"
        )
        .replace(
          "fixed inset-0 z-[55] bg-black/60",
          "fixed inset-0 z-[55] bg-black/60"
        )
        // Rebuild the drawer geometry so it is always a complete viewport-height panel,
        // regardless of the user's current scroll position.
        .replace(
          "fixed top-0 right-0 bottom-0 z-[60] w-[min(85vw,360px)]",
          "fixed inset-y-0 right-0 z-[60] h-[100dvh] max-h-[100dvh] w-[min(85vw,360px)]"
        );
    }

    if (normalizedId.endsWith("/src/styles.css")) {
      // Scope the X-button styles to the actual header toggle. The full-screen overlay
      // also has aria-label="Fechar menu" and must keep its inset-0 geometry.
      return code
        .replace(
          'button[aria-label="Fechar menu"] {',
          'header > div button[aria-label="Fechar menu"] {'
        )
        .replace(
          'button[aria-label="Fechar menu"]:hover',
          'header > div button[aria-label="Fechar menu"]:hover'
        )
        // Hard-disable every backdrop filter used by the mobile/tablet menu layer.
        .replace(
          '/* Menu mobile/tablet: trava a página enquanto o drawer estiver aberto */',
          '/* Menu mobile/tablet: trava a página enquanto o drawer estiver aberto */\n@media (max-width: 1023px) {\n  header, header * {\n    backdrop-filter: none !important;\n    -webkit-backdrop-filter: none !important;\n  }\n}\n'
        );
    }

    return null;
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
