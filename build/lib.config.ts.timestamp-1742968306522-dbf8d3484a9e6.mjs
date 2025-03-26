// build/lib.config.ts
import { defineConfig } from "file:///D:/orange-project/odos-ui/node_modules/.pnpm/vite@4.5.9_@types+node@20.17.23_sass@1.85.1/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import dts from "file:///D:/orange-project/odos-ui/node_modules/.pnpm/vite-plugin-dts@3.9.1_@type_967193a40c325a9847ed50a70dfd847d/node_modules/vite-plugin-dts/dist/index.mjs";
import vue from "file:///D:/orange-project/odos-ui/node_modules/.pnpm/@vitejs+plugin-vue@5.2.1_vi_4cd1a209ecfb18aed94b7967d46c718f/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vuejsx from "file:///D:/orange-project/odos-ui/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1._7875bc90a57e86181c2119a669114201/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import Markdown from "file:///D:/orange-project/odos-ui/node_modules/.pnpm/vite-plugin-md@0.21.5_happy_cabf6a62bd696d5efe2b9b84e796285c/node_modules/vite-plugin-md/dist/index.js";
var __vite_injected_original_dirname = "D:\\orange-project\\odos-ui\\build";
var nodeList = [];
var lib_config_default = defineConfig({
  build: {
    outDir: "lib",
    lib: {
      entry: resolve(__vite_injected_original_dirname, "../packages/index.ts"),
      name: "ODOSUI",
      formats: ["es", "umd"]
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: ["vue", "ant-design-vue", "@vueuse/core", "dayjs", "vue-router"],
      output: [
        {
          format: "es",
          dir: "lib/es",
          preserveModules: true,
          preserveModulesRoot: "packages",
          entryFileNames: (chunk) => {
            if (chunk.name.includes("node_modules")) {
              const list = chunk.name.split("@");
              if (list[list.length - 1].includes("node_modules")) {
                const Path = list[list.length - 1].replace(/^[\d._]+_/g, "");
                return `${Path.replace(/^\//g, "")}.js`;
              }
              return `${list[list.length - 1]}.js`;
            }
            if (nodeList.includes(chunk.name)) {
              return `module/${chunk.name}.js`;
            } else {
              nodeList.push(chunk.name);
              if (chunk.name.includes("vue")) {
                return `${chunk.name.split(".")[0]}.js`;
              } else {
                return `${chunk.name}.js`;
              }
            }
          },
          exports: "named"
        },
        {
          format: "umd",
          dir: "lib/umd",
          name: "ODOSUI",
          globals: {
            vue: "Vue",
            "ant-design-vue": "antd",
            "@vueuse/core": "VueUse",
            dayjs: "dayjs",
            "vue-router": "VueRouter"
          },
          entryFileNames: "odos-ui.umd.js",
          assetFileNames: "style.css",
          exports: "named"
        }
      ]
    },
    emptyOutDir: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false
      }
    }
  },
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "../src"),
      packages: resolve(__vite_injected_original_dirname, "../packages")
    }
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    Markdown(),
    vuejsx(),
    dts({
      include: ["packages/**/*"],
      outDir: "lib/es",
      staticImport: true,
      insertTypesEntry: true
    })
  ]
});
export {
  lib_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYnVpbGQvbGliLmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXG9yYW5nZS1wcm9qZWN0XFxcXG9kb3MtdWlcXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXG9yYW5nZS1wcm9qZWN0XFxcXG9kb3MtdWlcXFxcYnVpbGRcXFxcbGliLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovb3JhbmdlLXByb2plY3Qvb2Rvcy11aS9idWlsZC9saWIuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXHJcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHZ1ZWpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xyXG5pbXBvcnQgTWFya2Rvd24gZnJvbSAndml0ZS1wbHVnaW4tbWQnXHJcblxyXG5sZXQgbm9kZUxpc3QgPSBbXVxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIGJ1aWxkOiB7XHJcbiAgICBvdXREaXI6ICdsaWInLFxyXG4gICAgbGliOiB7XHJcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgJy4uL3BhY2thZ2VzL2luZGV4LnRzJyksXHJcbiAgICAgIG5hbWU6ICdPRE9TVUknLFxyXG4gICAgICBmb3JtYXRzOiBbJ2VzJywgJ3VtZCddXHJcbiAgICB9LFxyXG4gICAgY3NzQ29kZVNwbGl0OiBmYWxzZSxcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgZXh0ZXJuYWw6IFsndnVlJywgJ2FudC1kZXNpZ24tdnVlJywgJ0B2dWV1c2UvY29yZScsICdkYXlqcycsICd2dWUtcm91dGVyJ10sXHJcbiAgICAgIG91dHB1dDogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGZvcm1hdDogJ2VzJyxcclxuICAgICAgICAgIGRpcjogJ2xpYi9lcycsXHJcbiAgICAgICAgICBwcmVzZXJ2ZU1vZHVsZXM6IHRydWUsXHJcbiAgICAgICAgICBwcmVzZXJ2ZU1vZHVsZXNSb290OiAncGFja2FnZXMnLFxyXG4gICAgICAgICAgZW50cnlGaWxlTmFtZXM6IChjaHVuaykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2h1bmsubmFtZS5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcclxuICAgICAgICAgICAgICBjb25zdCBsaXN0ID0gY2h1bmsubmFtZS5zcGxpdCgnQCcpXHJcbiAgICAgICAgICAgICAgaWYgKGxpc3RbbGlzdC5sZW5ndGggLSAxXS5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IFBhdGggPSBsaXN0W2xpc3QubGVuZ3RoIC0gMV0ucmVwbGFjZSgvXltcXGQuX10rXy9nLCAnJylcclxuICAgICAgICAgICAgICAgIHJldHVybiBgJHtQYXRoLnJlcGxhY2UoL15cXC8vZywgJycpfS5qc2BcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGAke2xpc3RbbGlzdC5sZW5ndGggLSAxXX0uanNgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5vZGVMaXN0LmluY2x1ZGVzKGNodW5rLm5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGBtb2R1bGUvJHtjaHVuay5uYW1lfS5qc2BcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBub2RlTGlzdC5wdXNoKGNodW5rLm5hbWUpXHJcbiAgICAgICAgICAgICAgaWYgKGNodW5rLm5hbWUuaW5jbHVkZXMoJ3Z1ZScpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7Y2h1bmsubmFtZS5zcGxpdCgnLicpWzBdfS5qc2BcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke2NodW5rLm5hbWV9LmpzYFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGV4cG9ydHM6ICduYW1lZCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGZvcm1hdDogJ3VtZCcsXHJcbiAgICAgICAgICBkaXI6ICdsaWIvdW1kJyxcclxuICAgICAgICAgIG5hbWU6ICdPRE9TVUknLFxyXG4gICAgICAgICAgZ2xvYmFsczoge1xyXG4gICAgICAgICAgICB2dWU6ICdWdWUnLFxyXG4gICAgICAgICAgICAnYW50LWRlc2lnbi12dWUnOiAnYW50ZCcsXHJcbiAgICAgICAgICAgICdAdnVldXNlL2NvcmUnOiAnVnVlVXNlJyxcclxuICAgICAgICAgICAgZGF5anM6ICdkYXlqcycsXHJcbiAgICAgICAgICAgICd2dWUtcm91dGVyJzogJ1Z1ZVJvdXRlcidcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogJ29kb3MtdWkudW1kLmpzJyxcclxuICAgICAgICAgIGFzc2V0RmlsZU5hbWVzOiAnc3R5bGUuY3NzJyxcclxuICAgICAgICAgIGV4cG9ydHM6ICduYW1lZCdcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICBlbXB0eU91dERpcjogdHJ1ZVxyXG4gIH0sXHJcbiAgY3NzOiB7XHJcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgIHNjc3M6IHtcclxuICAgICAgICBjaGFyc2V0OiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi4vc3JjJyksXHJcbiAgICAgIHBhY2thZ2VzOiByZXNvbHZlKF9fZGlybmFtZSwgJy4uL3BhY2thZ2VzJylcclxuICAgIH1cclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSh7XHJcbiAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC5tZCQvXVxyXG4gICAgfSksXHJcbiAgICBNYXJrZG93bigpLFxyXG4gICAgdnVlanN4KCksXHJcbiAgICBkdHMoe1xyXG4gICAgICBpbmNsdWRlOiBbJ3BhY2thZ2VzLyoqLyonXSxcclxuICAgICAgb3V0RGlyOiAnbGliL2VzJyxcclxuICAgICAgc3RhdGljSW1wb3J0OiB0cnVlLFxyXG4gICAgICBpbnNlcnRUeXBlc0VudHJ5OiB0cnVlXHJcbiAgICB9KVxyXG4gIF1cclxufSkiXSwKICAibWFwcGluZ3MiOiAiO0FBQXFSLFNBQVMsb0JBQW9CO0FBQ2xULFNBQVMsZUFBZTtBQUN4QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixPQUFPLGNBQWM7QUFMckIsSUFBTSxtQ0FBbUM7QUFPekMsSUFBSSxXQUFXLENBQUM7QUFDaEIsSUFBTyxxQkFBUSxhQUFhO0FBQUEsRUFDMUIsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsS0FBSztBQUFBLE1BQ0gsT0FBTyxRQUFRLGtDQUFXLHNCQUFzQjtBQUFBLE1BQ2hELE1BQU07QUFBQSxNQUNOLFNBQVMsQ0FBQyxNQUFNLEtBQUs7QUFBQSxJQUN2QjtBQUFBLElBQ0EsY0FBYztBQUFBLElBQ2QsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLE9BQU8sa0JBQWtCLGdCQUFnQixTQUFTLFlBQVk7QUFBQSxNQUN6RSxRQUFRO0FBQUEsUUFDTjtBQUFBLFVBQ0UsUUFBUTtBQUFBLFVBQ1IsS0FBSztBQUFBLFVBQ0wsaUJBQWlCO0FBQUEsVUFDakIscUJBQXFCO0FBQUEsVUFDckIsZ0JBQWdCLENBQUMsVUFBVTtBQUN6QixnQkFBSSxNQUFNLEtBQUssU0FBUyxjQUFjLEdBQUc7QUFDdkMsb0JBQU0sT0FBTyxNQUFNLEtBQUssTUFBTSxHQUFHO0FBQ2pDLGtCQUFJLEtBQUssS0FBSyxTQUFTLENBQUMsRUFBRSxTQUFTLGNBQWMsR0FBRztBQUNsRCxzQkFBTSxPQUFPLEtBQUssS0FBSyxTQUFTLENBQUMsRUFBRSxRQUFRLGNBQWMsRUFBRTtBQUMzRCx1QkFBTyxHQUFHLEtBQUssUUFBUSxRQUFRLEVBQUUsQ0FBQztBQUFBLGNBQ3BDO0FBQ0EscUJBQU8sR0FBRyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUM7QUFBQSxZQUNqQztBQUNBLGdCQUFJLFNBQVMsU0FBUyxNQUFNLElBQUksR0FBRztBQUNqQyxxQkFBTyxVQUFVLE1BQU0sSUFBSTtBQUFBLFlBQzdCLE9BQU87QUFDTCx1QkFBUyxLQUFLLE1BQU0sSUFBSTtBQUN4QixrQkFBSSxNQUFNLEtBQUssU0FBUyxLQUFLLEdBQUc7QUFDOUIsdUJBQU8sR0FBRyxNQUFNLEtBQUssTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQUEsY0FDcEMsT0FBTztBQUNMLHVCQUFPLEdBQUcsTUFBTSxJQUFJO0FBQUEsY0FDdEI7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFVBQ0EsU0FBUztBQUFBLFFBQ1g7QUFBQSxRQUNBO0FBQUEsVUFDRSxRQUFRO0FBQUEsVUFDUixLQUFLO0FBQUEsVUFDTCxNQUFNO0FBQUEsVUFDTixTQUFTO0FBQUEsWUFDUCxLQUFLO0FBQUEsWUFDTCxrQkFBa0I7QUFBQSxZQUNsQixnQkFBZ0I7QUFBQSxZQUNoQixPQUFPO0FBQUEsWUFDUCxjQUFjO0FBQUEsVUFDaEI7QUFBQSxVQUNBLGdCQUFnQjtBQUFBLFVBQ2hCLGdCQUFnQjtBQUFBLFVBQ2hCLFNBQVM7QUFBQSxRQUNYO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGFBQWE7QUFBQSxFQUNmO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixTQUFTO0FBQUEsTUFDWDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLFFBQVEsa0NBQVcsUUFBUTtBQUFBLE1BQ2hDLFVBQVUsUUFBUSxrQ0FBVyxhQUFhO0FBQUEsSUFDNUM7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsTUFDRixTQUFTLENBQUMsVUFBVSxPQUFPO0FBQUEsSUFDN0IsQ0FBQztBQUFBLElBQ0QsU0FBUztBQUFBLElBQ1QsT0FBTztBQUFBLElBQ1AsSUFBSTtBQUFBLE1BQ0YsU0FBUyxDQUFDLGVBQWU7QUFBQSxNQUN6QixRQUFRO0FBQUEsTUFDUixjQUFjO0FBQUEsTUFDZCxrQkFBa0I7QUFBQSxJQUNwQixDQUFDO0FBQUEsRUFDSDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
