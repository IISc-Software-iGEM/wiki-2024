// Find all h1, h2, and h3 in .content and add an id attribute to them
// the id will be their name in lowercase with spaces replaced by dashes
// also give them a class of 'anchor'

document
  .querySelectorAll(".content h1, .content h2, .content h3")
  .forEach((el) => {
    el.id = el.textContent.toLowerCase().replace(/ /g, "-");
    el.classList.add("anchor");
  });

// now create a nested ul, li structure that represents the table of contents
// put subheadings under their parent heading
// each li should contain an anchor tag that links to the heading
// the anchor tag should contain the heading text

// go upto a depth of 3 (h1 > h2 > h3)
const toc = document.createElement("ul");

document
  .querySelectorAll(".content h1, .content h2, .content h3")
  .forEach((el) => {
    // create a new li element
    const li = document.createElement("li");
    // create a new anchor element
    const a = document.createElement("a");
    // set the href attribute of the anchor to the id of the heading
    a.href = "#" + el.id;
    // set the text of the anchor to the text of the heading
    a.textContent = el.textContent;
    // append the anchor to the li
    li.appendChild(a);

    // if the heading is an h1, append the li to the toc
    if (el.tagName === "H1") {
      toc.appendChild(li);
    }

    // if the heading is an h2, go the last li of the toc and check if it has a ul
    // if not, create a new ul and append it to the li
    // then append the li to the ul
    if (el.tagName === "H2") {
      const lastLi = toc.lastElementChild;
      if (!lastLi.querySelector("ul")) {
        lastLi.appendChild(document.createElement("ul"));
      }
      lastLi.querySelector("ul").appendChild(li);
    }

    // if the heading is an h3, go the last li of the toc and check if it has a ul
    // if not, create a new ul and append it to the li
    // then go to the last li of the ul and check if it has a ul
    // if not, create a new ul and append it to the li
    // then append the li to the ul
    if (el.tagName === "H3") {
      const lastLi = toc.lastElementChild;
      if (!lastLi.querySelector("ul")) {
        lastLi.appendChild(document.createElement("ul"));
      }
      const lastUl = lastLi.querySelector("ul");
      const lastLiInUl = lastUl.lastElementChild;
      if (!lastLiInUl.querySelector("ul")) {
        lastLiInUl.appendChild(document.createElement("ul"));
      }
      lastLiInUl.querySelector("ul").appendChild(li);
    }
  });

document.querySelector(".sidebar").appendChild(toc);

// Replace the iframe with PDF.js viewer
function replaceIframeWithPDF(iframe, pdfContainer) {
  const pdfUrl = iframe.src; // Get the PDF URL from iframe src
  iframe.style.display = "none"; // Hide the iframe

  // Load the PDF using PDF.js
  const loadingTask = pdfjsLib.getDocument(pdfUrl);
  loadingTask.promise.then(function (pdf) {
    let currentPage = 1;
    const totalPages = pdf.numPages;

    // Create a container to render PDF pages as a slideshow
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    pdfContainer.appendChild(canvas);
    console.log(pdfContainer);
    console.log(canvas);

    // Function to render a specific page
    function renderPage(pageNumber) {
      pdf.getPage(pageNumber).then(function (page) {
        const viewport = page.getViewport({ scale: 1.5 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };
        page.render(renderContext);
      });
    }

    // Initial page render
    renderPage(currentPage);

    // Create navigation buttons
    const prevButton = document.createElement("button");
    prevButton.innerHTML = "Previous";
    prevButton.onclick = function () {
      if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
      }
    };

    const nextButton = document.createElement("button");
    nextButton.innerHTML = "Next";
    nextButton.onclick = function () {
      if (currentPage < totalPages) {
        currentPage++;
        renderPage(currentPage);
      }
    };

    pdfContainer.appendChild(prevButton);
    pdfContainer.appendChild(nextButton);
  });
}

// Run the function to replace iframes with PDF.js containers
// replaceIframeWithPDF();

// loop over all iframe.presentation
for (let iframe of document.querySelectorAll("iframe.presentation")) {
  // create a div element
  const pdfContainer = document.createElement("div");
  // add a class of 'pdf-container' to the div
  pdfContainer.classList.add("pdf-container");
  // insert the div before the iframe
  iframe.before(pdfContainer);

  // call the replaceIframeWithPDF function with the iframe and the div
  replaceIframeWithPDF(iframe, pdfContainer);

  console.log(iframe);
  console.log(pdfContainer);
}
