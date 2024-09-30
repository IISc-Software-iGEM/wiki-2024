// Find all h1, h2, and h3 in .content and add an id attribute to them
// the id will be their name in lowercase with spaces replaced by dashes
// also give them a class of 'anchor'

document.querySelectorAll('.content h1, .content h2, .content h3').forEach((el) => {
  el.id = el.textContent.toLowerCase().replace(/ /g, '-');
  el.classList.add('anchor');
});

// now create a nested ul, li structure that represents the table of contents
// put subheadings under their parent heading
// each li should contain an anchor tag that links to the heading
// the anchor tag should contain the heading text

const toc = document.createElement('ul');
let currentUl = toc;
let currentLi = null;
document.querySelectorAll('.content h1, .content h2, .content h3').forEach((el) => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = `#${el.id}`;
  a.textContent = el.textContent;
  li.appendChild(a);

  if (el.tagName === 'H1') {
    currentUl.appendChild(li);
    currentLi = li;
  } else if (el.tagName === 'H2') {
    const ul = document.createElement('ul');
    li.appendChild(ul);
    currentUl = ul;
    currentLi.appendChild(li);
    currentLi = li;
  } else {
    currentUl.appendChild(li);
  }
});

document.querySelector('.sidebar').appendChild(toc);
