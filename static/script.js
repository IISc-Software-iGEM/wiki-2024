// Find all h1, h2, and h3 in .content and add an id attribute to them
// the id will be their name in lowercase with spaces replaced by dashes
// also give them a class of 'anchor'
// replace any special characters (non alphanumeric and non spaces) with a dash

document
  .querySelectorAll(".content h1, .content h2, .content h3")
  .forEach((el) => {
    el.id = el.textContent.toLowerCase().replace(/ /g, "_").replace(/[^a-z0-9_]/g, "");
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

// go over all iframe.presentation and wrap them in a div called presentation-container
document.querySelectorAll("iframe.presentation").forEach((iframe) => {
  const container = document.createElement("div");
  container.classList.add("presentation-container");
  iframe.parentNode.insertBefore(container, iframe);
  container.appendChild(iframe);
});

// go over all iframe.presentation and create a PDF.js
document.querySelectorAll("iframe.presentation").forEach((iframe) => {
  const pdfUrl = iframe.src; // Get the PDF URL from the iframe
  iframe.style.display = "none"; // Hide the iframe

  // Create a new container to hold the PDF slideshow
  const pdfContainer = document.createElement("div");
  pdfContainer.classList = ["pdfContainer"];

  // Load the PDF using PDF.js
  const loadingTask = pdfjsLib.getDocument(pdfUrl);
  loadingTask.promise
    .then(function (pdf) {
      let currentPage = 1;
      const totalPages = pdf.numPages;

      // Create a canvas for rendering PDF pages
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      pdfContainer.appendChild(canvas);

      function renderPage(pageNumber) {
        pdf.getPage(pageNumber).then(function (page) {
          const viewport = page.getViewport({ scale: 1.5 });
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: ctx,
            viewport: viewport,
          };

          // Render the page
          page.render(renderContext).promise.then(function () {
            console.log("Page rendered");
          });
        });
      }

      // automatically change the page
      var changeFunc = () => {
        if (currentPage < totalPages) {
          currentPage++;
          renderPage(currentPage);
        } else {
          currentPage = 1;
          renderPage(currentPage);
        }
      };
      var interval = setInterval(changeFunc, 3000);

      // Initial page render
      renderPage(currentPage);

      // Create navigation buttons
      const prevButton = document.createElement("button");
      prevButton.innerHTML = `<svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>`;
      prevButton.onclick = function () {
        if (currentPage > 1) {
          currentPage--;
          renderPage(currentPage);
        } else {
          currentPage = totalPages;
          renderPage(currentPage);
        }
        clearInterval(interval);
        interval = setInterval(changeFunc, 3000);
      };
      prevButton.classList.add("prev");

      const nextButton = document.createElement("button");
      nextButton.innerHTML = `<svg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>`;
      nextButton.onclick = function () {
        if (currentPage < totalPages) {
          currentPage++;
          renderPage(currentPage);
        } else {
          currentPage = 1;
          renderPage(currentPage);
        }
        clearInterval(interval);
        interval = setInterval(changeFunc, 3000);
      };
      nextButton.classList.add("next");

      // Append the buttons to the container
      pdfContainer.appendChild(prevButton);
      pdfContainer.appendChild(nextButton);

      document.querySelector(".content").appendChild(pdfContainer);
      // iframe.parentNode.appendChild(pdfContainer);

      // find the .presentation-container whcih contains iframe with same src
      document.querySelectorAll(".presentation-container").forEach((container) => {
        if (container.querySelector("iframe").src === pdfUrl) {
          container.appendChild(pdfContainer);
          return;
        }
      });
    })
    .catch(function (error) {
      console.error("Error loading PDF:", error);
      pdfContainer.innerHTML = "Failed to load PDF.";
    });
});
