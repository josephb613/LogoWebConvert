const imageInput = document.getElementById("imageInput");
const formatSelect = document.getElementById("formatSelect");
const convertButton = document.getElementById("convertButton");
const logoOutput = document.getElementById("logoOutput");
const downloadLink = document.getElementById("downloadLink");

convertButton.addEventListener("click", handleConversion);

function handleConversion() {
  const selectedFile = imageInput.files[0];
  
  if (selectedFile) {
    const selectedFormat = formatSelect.value;
    const reader = new FileReader();
    
    reader.onload = function (e) {
      const img = new Image();
      img.src = e.target.result;
      img.onload = function () {
        const logoImage = resizeImage(img, 100, 100); 
        
    
        logoOutput.src = logoImage.src;
        logoOutput.style.display = "block";
        
  
        downloadLink.href = logoImage.src;
        downloadLink.download = `logo.${selectedFormat}`;
        downloadLink.style.display = "block";
      };
    };
    
    reader.readAsDataURL(selectedFile);
  }
}

function resizeImage(image, width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, width, height);
  
  const resizedImage = new Image();
  resizedImage.src = canvas.toDataURL(`image/${formatSelect.value}`);
  return resizedImage;
}
