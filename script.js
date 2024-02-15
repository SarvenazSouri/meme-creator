//------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  const templateSelect = document.getElementById("templateSelector");
  const img = document.getElementById("preview-image");
  templateSelect.addEventListener("change", function () {
    switch (templateSelector.value) {
      case "./images/success-baby.jpg":
        img.src = "./images/success-baby.jpg";
        break;
      case "./images/think.jpg":
        img.src = "./images/think.jpg";
        break;
      case "./images/aliens.jpg":
        img.src = "./images/aliens.jpg";
        break;
      case "./images/picard.jpg":
        img.src = "./images/picard.jpg";
        break;
      case "./images/buzz-and-woody.jpg":
        img.src = "./images/buzz-and-woody.jpg";
    }
  });

  /**
   * letterbox
   */
  const checkboxInput = document.getElementById("whiteLetterboxCheckbox");
  const divPreview = document.getElementById("preview-image-container");
  checkboxInput.addEventListener("change", function () {
    divPreview.style.backgroundColor = checkboxInput.checked
      ? "white"
      : "black";
  });

  /**
   * label
   */

  const labels = document.querySelectorAll(".form-row > input[type=radio]");
  const paragraph = document.querySelectorAll("#preview-image-container > p");
  const textarea = document.getElementById("label-text");
  textarea.value = "";

  const fontSizeSelector = document.getElementById("fontSizeSelector");

  const colorSelector = document.getElementById("colorSelector");

  const fontSelector = document.getElementById("fontSelector");

  for (let i = 0; i < labels.length; i++) {
    labels[i].addEventListener("change", function () {
      if (labels[i].checked == true) {
        /**
         * Label-Text
         */

        textarea.value = paragraph[i].innerHTML.trim();
        textarea.oninput = (event) => {
          paragraph[i].textContent = textarea.value;
        };

        /**
         * font-size
         */

        fontSizeSelector.value = paragraph[i].style.fontSize.slice(0, -2);

        fontSizeSelector.onchange = (event) => {
          paragraph[i].style.fontSize = `${fontSizeSelector.value}px`;
        };

        /**
         * color
         */

        colorSelector.value = rgb2hex(paragraph[i].style.color);
        colorSelector.onchange = (event) => {
          paragraph[i].style.color = colorSelector.value;
        };

        /**
         * font-family
         */

        fontSelector.value = paragraph[i].style.fontFamily;
        fontSelector.onchange = (event) => {
          paragraph[i].style.fontFamily = fontSelector.value;
        };
      }
    });
  }
});

//------------------------------------------------------------------------------

// Lorsqu'on recupere la taille de police d'un paragraphe, p.style.fontSize
// le format retourné est une string 'YYpx', ex: '16px'
// pour fournir la valeur au input number,
// on doit conserver les caractères numeriques seulement, donc tous sauf les 2 derniers
// fontSizeString.slice(0, -2) trasnforme '16px' en '16'

// Lorsqu'on recupere la couleur d'un paragraphe, p.style.color
// le format retourné est rgb(x, y, x)
// pour fournir la valeur au input color,
// on doit convertir au format #RRGGBB
function rgb2hex(color) {
  // https://stackoverflow.com/a/30381663
  if (color.indexOf("#") != -1) {
    return color;
  }

  color = color
    .replace("rgba", "")
    .replace("rgb", "")
    .replace("(", "")
    .replace(")", "");
  color = color.split(","); // get Array["R","G","B"]

  // 0) add leading #
  // 1) add leading zero, so we get 0XY or 0X
  // 2) append leading zero with parsed out int value of R/G/B
  //    converted to HEX string representation
  // 3) slice out 2 last chars (get last 2 chars) =>
  //    => we get XY from 0XY and 0X stays the same
  return (
    "#" +
    ("0" + parseInt(color[0], 10).toString(16)).slice(-2) +
    ("0" + parseInt(color[1], 10).toString(16)).slice(-2) +
    ("0" + parseInt(color[2], 10).toString(16)).slice(-2)
  );
}
