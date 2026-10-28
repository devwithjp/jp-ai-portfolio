import {
  siAndroid, siAnthropic, siApachehadoop, siApachehbase, siApachehive, siApachespark, siArduino,
  siBluetooth, siC, siConvex, siD3, siDart, siDeno, siDocker, siDrizzle, siEspressif, siFastapi,
  siFfmpeg, siFigma, siFlutter, siGatsby, siGithub, siGraphql, siGreensock, siHomeassistant,
  siHtml5, siHuggingface, siJavascript, siJira, siJupyter, siLighthouse, siLinear, siMaplibre,
  siMicropython, siMoodle, siMqtt, siNextdotjs, siNodedotjs, siNumpy, siOllama, siPandas, siPhp,
  siPnpm, siPostgresql, siPytest, siPython, siPytorch, siRaspberrypi, siReact, siReacthookform,
  siRedux, siScikitlearn, siSequelize, siSupabase, siTailwindcss, siTensorflow, siTypescript,
  siVercel, siVitest, siWebpack, siZod,
} from "simple-icons";

// Named imports only, so the bundle carries these ~61 paths, not the whole set.
// Logos render in their brand colour. Near-black brands (Next.js, Vercel, GitHub…)
// would vanish on the dark theme, so those fall back to currentColor.
const icons: Record<string, { path: string; title: string; hex: string }> = {
  siAndroid, siAnthropic, siApachehadoop, siApachehbase, siApachehive, siApachespark, siArduino,
  siBluetooth, siC, siConvex, siD3, siDart, siDeno, siDocker, siDrizzle, siEspressif, siFastapi,
  siFfmpeg, siFigma, siFlutter, siGatsby, siGithub, siGraphql, siGreensock, siHomeassistant,
  siHtml5, siHuggingface, siJavascript, siJira, siJupyter, siLighthouse, siLinear, siMaplibre,
  siMicropython, siMoodle, siMqtt, siNextdotjs, siNodedotjs, siNumpy, siOllama, siPandas, siPhp,
  siPnpm, siPostgresql, siPytest, siPython, siPytorch, siRaspberrypi, siReact, siReacthookform,
  siRedux, siScikitlearn, siSequelize, siSupabase, siTailwindcss, siTensorflow, siTypescript,
  siVercel, siVitest, siWebpack, siZod,
};

export function SkillIcon({ name, size = 14 }: { name?: string; size?: number }) {
  const icon = name ? icons[name] : undefined;
  if (!icon) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden
      className="flex-none"
      style={isDark(icon.hex) ? undefined : { color: `#${icon.hex}` }}
    >
      <path d={icon.path} />
    </svg>
  );
}

// Relative luminance below ~0.08 reads as black on the deep-ocean background.
function isDark(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.08;
}
