export function loadScript(url: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.body.appendChild(script);
    script.onload = () => {
      resolve(true);
    };
    script.onerror = (error) => {
      reject(new Error(`Failed to load script: ${url}`));
    };
  });
}
