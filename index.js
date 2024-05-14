const input = document.getElementById("input");
const output = document.getElementById("output");
const error = document.getElementById("error");
let hexString;
let checksum = "";
input.addEventListener("input", (e) => {
  const replaced = e.target.value.replace(/\s/g, "");
  if (replaced.length !== 16 * 2) {
    output.innerText = "";
    error.innerText = `길이는 16바이트여야 합니다. 현재 길이: ${replaced.length / 2}`;
    return;
  }
  error.innerText = "";

  const bytes = hex2bytes(replaced);
  hexString = bytes2hex(bytes);
  const sum = bytes.reduce((a, b) => a + b, 0);
  checksum = (sum % 256).toString(16);
  output.innerText = checksum;
});

const copyButton = document.getElementById("copy");
copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(checksum);
});

const copyBodyButton = document.getElementById("copyBody");
copyBodyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(`${hexString} ${checksum}`);
});
const copyAllButton = document.getElementById("copyAll");
copyAllButton.addEventListener("click", () => {
  navigator.clipboard.writeText(`AA 55 ${hexString} ${checksum} 0D 0D`);
});

function hex2bytes(hex) {
  const bytes = [];
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.substr(i, 2), 16));
  }
  return bytes;
}

function bytes2hex(bytes) {
  return bytes
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(" ")
    .toUpperCase();
}
