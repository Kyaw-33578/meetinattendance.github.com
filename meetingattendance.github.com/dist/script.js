const languageSelect = document.getElementById("language-select");

const translations = {
  en: {
    title: "Weekly Meeting Attendance",
    name: "Full Name",
    id: "Employee ID",
    dept: "Department",
    date: "Date",
    sign: "E-signature",
    submit: "Submit"
  },
  zh: {
    title: "每週會議出席表",
    name: "全名",
    id: "員工編號",
    dept: "部門",
    date: "日期",
    sign: "電子簽名",
    submit: "提交"
  },
  my: {
    title: "စုပေါင်းအစည်းအဝေး တက်ရောက်မှုဖောင်",
    name: "အမည်အပြည့်အစုံ",
    id: "ဝန်ထမ်းအမှတ်",
    dept: "ဌာန",
    date: "ရက်စွဲ",
    sign: "အီးလက်မှတ်",
    submit: "တင်သွင်းမည်"
  }
};

function updateLanguage(lang) {
  const t = translations[lang];
  document.getElementById("form-title").textContent = t.title;
  document.getElementById("label-name").textContent = t.name;
  document.getElementById("label-id").textContent = t.id;
  document.getElementById("label-dept").textContent = t.dept;
  document.getElementById("label-date").textContent = t.date;
  document.getElementById("label-sign").textContent = t.sign;
  document.getElementById("submit-btn").textContent = t.submit;
}

languageSelect.addEventListener("change", (e) => {
  updateLanguage(e.target.value);
});

// Default language
updateLanguage("en");

// Optional: Form submission behavior
document.getElementById("attendance-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Form submitted successfully!");
});

const canvas = document.getElementById("signature-pad");
const ctx = canvas.getContext("2d");
let drawing = false;

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);
canvas.addEventListener("mousemove", draw);

// Touch support
canvas.addEventListener("touchstart", startDrawingTouch);
canvas.addEventListener("touchend", stopDrawing);
canvas.addEventListener("touchmove", drawTouch);

function getCanvasPos(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

function getTouchPos(e) {
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  return {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top
  };
}

function startDrawing(e) {
  drawing = true;
  const pos = getCanvasPos(e);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
}

function startDrawingTouch(e) {
  e.preventDefault();
  drawing = true;
  const pos = getTouchPos(e);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
}

function draw(e) {
  if (!drawing) return;
  const pos = getCanvasPos(e);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
}

function drawTouch(e) {
  if (!drawing) return;
  const pos = getTouchPos(e);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
}

function stopDrawing() {
  drawing = false;
  ctx.closePath();
}

// Clear button
document.getElementById("clear-signature").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});