const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
// ctx.fillStyle = "green";
ctx.beginPath();
ctx.arc(120, 120, 100, 0, Math.PI * 2);
ctx.fillStyle = "red";
ctx.fill();
ctx.lineWidth=20; // 包括在圆内
ctx.strokeStyle = "yellow";
ctx.stroke();
// ctx.fillRect(10, 10, 200, 200);
