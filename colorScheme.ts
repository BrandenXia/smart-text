const colorVars = {
  "base-100": "--b1",
  "base-200": "--b2",
  "base-300": "--b3",
  "base-content": "--bc",
  neutral: "--n",
  "neutral-content": "--nc",
  primary: "--p",
  "primary-content": "--pc",
  secondary: "--s",
  "secondary-content": "--sc",
  accent: "--a",
};

const colorScheme: Record<string, string> = Object.keys(colorVars).reduce(
  (acc, key) => {
    const value = colorVars[key as keyof typeof colorVars];
    acc[key] = `rgb(var(${value}) / <alpha-value>)`;
    return acc;
  },
  {} as Record<string, string>,
);

export default colorScheme;
