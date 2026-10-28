const horizontal = document.getElementById("horizontal"); 
const vertical = document.getElementById("vertical");
const blur = document.getElementById("blur");
const spread= document.getElementById("spread");
const color = document.getElementById("color");
const opacity = document.getElementById("opacity");
const inset= document.getElementById("inset");
const box = document.getElementById("box");
const code = document.getElementById("code");
const copyButton= document.getElementById("copy-button");

const horizontalValue= document.getElementById("horizontal-value");
const verticalValue = document.getElementById("vertical-value");
const blurValue = document.getElementById("blur-value");
const spreadValue = document.getElementById("spread-value");
const colorValue = document.getElementById("color-value");
const opacityValue = document.getElementById("opacity-value");

function hexToRGBA(hex, opacity) {
const r = parseInt(hex.slice(1,3), 16);
const g = parseInt(hex.slice(3,5), 16);
const b = parseInt(hex.slice(5,7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
function updateShadow(){
    const currentOpacity = opacity.value / 100;

    const shadowColor = hexToRGBA(color.value, currentOpacity);
    const insetValue = inset.checked ? "inset " : "";
    const boxShadowValue = `${insetValue}${horizontal.value}px ${vertical.value}px ${blur.value}px ${spread.value}px ${shadowColor}`;

    box.style.boxShadow= boxShadowValue; 
    code.textContent =  `box-shadow: ${boxShadowValue}';`

    horizontalValue.textContent = `${horizontal.value}px;`
    verticalValue.textContent = `${vertical.value}px;`
    spreadValue.textContent = `${spread.value}px;`
    colorValue.textContent = color.value.toUpperCase();
    opacityValue.textContent = `${opacity.value}%`;
}  
    horizontal.addEventListener("input", updateShadow);
    vertical.addEventListener("input", updateShadow); 
    blur.addEventListener("input", updateShadow);
    spread.addEventListener("input", updateShadow);
    color.addEventListener("input", updateShadow);
    opacity.addEventListener("input", updateShadow);
    inset.addEventListener("input", updateShadow);

    copyButton.addEventListener("click",()=>{
        window.navigator.clipboard.writeText(code.textContent).then(()=>{
        const originalText = copyButton.textContent;
        copyButton.textContent = "Copied!";
        setTimeout(()=>{
            copyButton.textContent = originalText;
        },1500);
    }) ;
});
    updateShadow();