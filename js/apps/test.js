const appTest = document.getElementById("appTest");
const appTestLauncher = document.getElementById("appTestLauncher");
const closeAppTestBtn = document.getElementById("closeAppTest")

appTestLauncher.addEventListener("click",()=>{
    appTest.classList.remove("close-app");
});

closeAppTestBtn.addEventListener("click",()=>{
    appTest.classList.add("close-app");
});
