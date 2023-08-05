const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Quadratic Bézier curve
ctx.beginPath();
ctx.moveTo(50, 20);
ctx.lineTo(150, 20);
ctx.lineTo(150, 120);
ctx.lineTo(50, 120);
ctx.closePath();
ctx.strokeStyle = "red";
ctx.fillStyle = "yellow";
// ctx.strokeRect(50,20, 100, 100);
// ctx.strokeRect(50,20, 100, 100);
ctx.fill();
