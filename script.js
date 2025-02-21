
const form = document.getElementById("form")
const imageContainer = document.getElementById("image-container")
const image = document.getElementById("image")


imageContainer.style.display = "none"

form.addEventListener("submit", handleGenerate)

function handleGenerate(e) {
    e.preventDefault()
    const category = document.querySelector("#category")
    const width = document.querySelector("#width")
    const height = document.querySelector("#height")

    const generateButton = form.querySelector("button[type='submit']");
    const generateLoader = generateButton.querySelector(".loader");
    const generateText = generateButton.querySelector("span");

    if (!width.value || !height.value) {
        alert("Please fill in all fields")
        return
    }

     // Show loader and disable button
     generateLoader.style.display = "inline-block";
     generateText.style.opacity = "0.5";
     generateButton.disabled = true;
 

    let imageLink = ""
    imageContainer.style.display = "block"
    form.style.display = "none"
    if (!category.value) {
        imageLink = `https://picsum.photos/${width.value}/${height.value}?random=1`
        image.src = imageLink;
          generateLoader.style.display = "none";
        generateText.style.opacity = "1";
        generateButton.disabled = false;
    }
    else {
        imageLink = `https://picsum.photos/${width.value}/${height.value}?random=1`
        image.src = imageLink;
          generateLoader.style.display = "none";
        generateText.style.opacity = "1";
        generateButton.disabled = false;
    }
    image.alt = `Image of ${category.value} with dimensions ${width.value}x${height.value}`



    const handleCopyLink = () => {
        navigator.clipboard.writeText(imageLink).then(() => {
            alert("Image link copied to clipboard!");
        }).catch(err => console.error("Failed to copy link:", err));
    }
    const handleDownloadImage = async () => {
        const downloadButton = document.querySelector(".download");
        const downloadLoader = downloadButton.querySelector(".loader");
        const downloadText = downloadButton.querySelector("span");

        downloadLoader.style.display = "inline-block";
        downloadText.style.opacity = "0.5";
        downloadButton.disabled = true;

        try {
            const response = await fetch(imageLink);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "random-image.jpg";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Failed to download image:", error);
            alert("Failed to download image. Please try again.");
        } finally {
            // Hide loader and enable button
            downloadLoader.style.display = "none";
            downloadText.style.opacity = "1";
            downloadButton.disabled = false;
        }
    };
    const handleReset = () => {
        form.style.display = "block"
        imageContainer.style.display = "none"
        category.value = ""
        width.value = ""
        height.value = ""
    }

    document.querySelector(".copyLink").addEventListener("click", handleCopyLink)
    document.querySelector(".download").addEventListener("click", handleDownloadImage)
    document.querySelector(".reset").addEventListener("click", handleReset)
}