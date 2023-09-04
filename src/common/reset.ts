(function () {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log("widow size", window.innerWidth, window.innerHeight);
  }

  // 初始化 Canvas 大小
  resizeCanvas();

  // 监听窗口大小变化，动态调整 Canvas 大小
  window.addEventListener("resize", resizeCanvas);
})();
