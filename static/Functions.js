

document.addEventListener("DOMContentLoaded", function() {
  
	const accessibilityMenuURL = './static/Toolbar.html'; 	
	const stylesURL = './static/styles.scss'; 
	
	var link = document.createElement('link');
	// link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css';
	link.rel = 'stylesheet';
	document.head.appendChild(link);

	fetch(stylesURL)
		.then(response => response.text())
		.then(cssText => {
			var styleTag = document.createElement('style');
			styleTag.textContent = cssText;
			document.head.appendChild(styleTag);
  
			return fetch(accessibilityMenuURL);
		})
		.then(response => response.text())
		.then(htmlContent => {
			var createMain = document.createElement('div');
			createMain.className = 'main';
			createMain.innerHTML = document.body.innerHTML;
			document.body.innerHTML = '';
			document.body.appendChild(createMain);

			
			var createToolBox = document.createElement('div');
			createToolBox.id = 'init-access-tool';
			createToolBox.innerHTML = htmlContent;
  
			document.body.insertBefore(createToolBox, document.body.firstChild);
			const accessToolButton = document.querySelector(".accesstool");
			const accessToolBar = document.querySelector(".access-tool-bar");
			const closeButton = document.querySelector(".close-button");
			const main = document.querySelector('.main');
			
			function toggleAccessibilityToolBar() {
			if (accessToolBar.style.visibility === "hidden") {
				accessToolBar.style.visibility = "visible";
				accessToolBar.style.opacity = 1;
			} else {
				accessToolBar.style.visibility = "hidden";
				accessToolBar.style.opacity = 0;
			}
			}
		
			accessToolButton.addEventListener("click", toggleAccessibilityToolBar);
			closeButton.addEventListener("click", toggleAccessibilityToolBar);
		
			// document.body.style.margin = 0;
			document.body.style.padding = 0;


			// invert fuction
			const invertButton = document.querySelector("#Invert");
			invertButton.addEventListener('click', function() {
				main.classList.toggle('invert');
				if ( main.classList.contains('grayscale')) {
					main.classList.remove('grayscale');
				}
				if ( main.classList.contains('highsaturation')) {
					main.classList.remove('highsaturation');
				}
				if ( main.classList.contains('lowsaturation')) {
					main.classList.remove('lowsaturation');
				}
			});
			
			// grayscale function
			const grayscaleButton = document.querySelector("#Grayscale");
			grayscaleButton.addEventListener('click', function() {
				if (main.classList.contains('invert')) {
					main.classList.remove('invert');
				}
				if (main.classList.contains('highsaturation')) {
					main.classList.remove('highsaturation');
				}
				if (main.classList.contains('lowsaturation')) {
					main.classList.remove('lowsaturation');
				}
				main.classList.toggle('grayscale');
			});


			// low saturation function
			const lowsaturationbutton = document.querySelector("#lowsaturation");
			lowsaturationbutton.addEventListener('click', function() {
				if (main.classList.contains('grayscale')) {
					main.classList.remove('grayscale');
				}
				if (main.classList.contains('highsaturation')) {
					main.classList.remove('highsaturation');
				}
				if (main.classList.contains('invert')) {
					main.classList.remove('invert');
				}
				main.classList.toggle('lowsaturation');
			}); 



			// high saturation function
			const highSaturationButton = document.querySelector("#highsaturation");
			highSaturationButton.addEventListener('click', function() {
				if (main.classList.contains('lowsaturation')) {
					main.classList.remove('lowsaturation');
				}
				if (main.classList.contains('grayscale')) {

					main.classList.remove('grayscale');
				}
				if (main.classList.contains('invert')) {
					main.classList.remove('invert');
				}
				main.classList.toggle('highsaturation');
			});


			// increase Font Size function
			const increaseFontSizeButton = document.querySelector('#increasefontsize');

			increaseFontSizeButton.addEventListener('click', function() {
			  const currentFontSize = window.getComputedStyle(document.body).fontSize;
			  let fontSizeUnit = 'px'; // Default unit (can be adjusted)
			  let fontSizeValue = parseFloat(currentFontSize);
			
			  if (currentFontSize.includes('em')) {
				fontSizeUnit = 'em';
			  } else if (currentFontSize.includes('rem')) {
				fontSizeUnit = 'rem';
			  }
			
			  const newFontSize = fontSizeValue * 1.2;
			  document.body.style.fontSize = newFontSize + fontSizeUnit;
			});

			// decrease Font Size function
			const decreaseFontSizeButton = document.querySelector('#decreasefontsize');
			decreaseFontSizeButton.addEventListener('click', function(){
			  const currentFontSize = window.getComputedStyle(document.body).fontSize;
			  let fontSizeUnit = 'px'; // Default unit (can be adjusted)
			  let fontSizeValue = parseFloat(currentFontSize);
			
			  if (currentFontSize.includes('em')) {
				fontSizeUnit = 'em';
			  } else if (currentFontSize.includes('rem')) {
				fontSizeUnit = 'rem';
			  }
			  const newFontSize = fontSizeValue / 1.2;
			  document.body.style.fontSize = newFontSize + fontSizeUnit;
			});


			//increase letter spacing function
			const increaseLetterSpacingButton = document.querySelector('#increaseletterspacing');
			increaseLetterSpacingButton.addEventListener('click', function() {
				const currentLetterSpacing = window.getComputedStyle(document.body).letterSpacing;
				let letterSpacingValue = parseFloat(currentLetterSpacing);
				
				if(isNaN(letterSpacingValue)) {
					letterSpacingValue = 0;
				}

				const newLetterSpacing = letterSpacingValue + 1;
				document.body.style.letterSpacing = newLetterSpacing + 'px';
			});

			//increase line height function
			const increaseLineHeightButton = document.querySelector('#increaselineheight');

			increaseLineHeightButton.addEventListener('click', function() {	
				const currentLineHeight = window.getComputedStyle(document.body).lineHeight;
				let lineHeightValue = parseFloat(currentLineHeight);
				
				if(isNaN(lineHeightValue)) {
					lineHeightValue = 50;
				}

				const newLineHeight = lineHeightValue + 5;
				document.body.style.lineHeight = newLineHeight + 'px';
			});

			//zoom-in function
			const zoomInButton = document.querySelector('#zoomin');
			let zoominbutton = false;
			zoomInButton.addEventListener('click', function() {
				zoominbutton = !zoominbutton;
				if(zoominbutton){
					main.style.zoom = '150%';
					zoomInButton.style.backgroundColor = 'lightblue';
				}
				else{
					main.style.zoom = '100%';
					zoomInButton.style.backgroundColor = '';
				}
			});

			//zoom-out function
			const zoomOutButton = document.querySelector('#zoomout');
			let zoomoutbutton = false;
			zoomOutButton.addEventListener('click', function() {
				zoomoutbutton =!zoomoutbutton;
				if(zoomoutbutton){
					main.style.zoom = '50%';
					zoomOutButton.style.backgroundColor = 'lightblue';
				}
				else{
					main.style.zoom = '100%';
					zoomOutButton.style.backgroundColor = '';
				}
			});

			//readmode
			const readModeButton = document.querySelector('#readmode');
			let isReadModeEnabled = false; 

			readModeButton.addEventListener('click', function() {
			isReadModeEnabled = !isReadModeEnabled; 

			if (isReadModeEnabled) {
				document.body.style.backgroundColor = 'black';
				document.body.style.color = 'white';
				readModeButton.style.backgroundColor = 'lightblue';
			} else {
				document.body.style.backgroundColor = '';
				document.body.style.color = '';
				readModeButton.style.backgroundColor = '';
			}
			});

			
			//whitecursor
			const whiteCursorButton = document.querySelector('#whitecursor');
			const cursorImageUrl = './static/Images_for_toolbar/pointer-white.png';
			const cursorPointer = './static/Images_for_toolbar/hand-pointer-white.png'; 
			let whitecursorbutton= false;
			whiteCursorButton.addEventListener('click', function() {
			whitecursorbutton = !whitecursorbutton;
			if(whitecursorbutton){	
			whiteCursorButton.style.backgroundColor = 'lightblue';
			document.body.style.cursor = `url(${cursorImageUrl}), auto`;
			const buttons = document.querySelectorAll('button');
			buttons.forEach(button => button.style.cursor = `url(${cursorPointer}), auto`);
			const links = document.querySelectorAll('a');
			links.forEach(link => link.style.cursor = `url(${cursorPointer}), auto`);}
			else{
				whiteCursorButton.style.backgroundColor = '';
				document.body.style.cursor = 'auto';
				const buttons = document.querySelectorAll('button');
				buttons.forEach(button => button.style.cursor = 'auto');
				const links = document.querySelectorAll('a');
				links.forEach(link => link.style.cursor = 'auto');
			}
			});

			//blackcursor
			const blackCursorButton = document.querySelector('#blackcursor');
			const cursorImage = './static/Images_for_toolbar/black-pointer.png';
			const cursorPoint = './static/Images_for_toolbar/hand-pointer-black.png';
			let blackcursorbutton = false; 
			blackCursorButton.addEventListener('click', function() {
			blackcursorbutton = !blackcursorbutton;
			if (blackcursorbutton) {
			blackCursorButton.style.backgroundColor = 'lightblue';
			document.body.style.cursor = `url(${cursorImage}), auto`;
			const buttons = document.querySelectorAll('button');
			buttons.forEach(button => button.style.cursor = `url(${cursorPoint}), auto`);
			const links = document.querySelectorAll('a');
			links.forEach(link => link.style.cursor = `url(${cursorPoint}), auto`);}
			else{
				blackCursorButton.style.backgroundColor = '';
				document.body.style.cursor = 'auto';
				const buttons = document.querySelectorAll('button');
				buttons.forEach(button => button.style.cursor = 'auto');
				const links = document.querySelectorAll('a');
				links.forEach(link => link.style.cursor = 'auto');
			}
			});


			//highlightlinks
			const highlightLinksButton = document.querySelector('#linkhighlighter');
			highlightLinksButton.addEventListener('click', function() {
				const toggleHighlightButton = document.getElementById('toggle-link-highlight'); 
				const links = document.querySelectorAll('a'); 
				function toggleHighlight(enabled) {
				  links.forEach(link => {
					link.style.backgroundColor = enabled ? "lightblue" : '';
				  });
				}
				if (toggleHighlightButton) { 
				  toggleHighlightButton.addEventListener('click', function() {
					const enabled = !document.body.classList.contains('link-highlight-enabled');
					document.body.classList.toggle('link-highlight-enabled');
					toggleHighlight(enabled);
				  });
				} else { 
				  toggleHighlight(true);
				}
				links.forEach(link => {
				  link.addEventListener('mouseover', function() {
					this.style.backgroundColor = "lightblue" + '80'; 
				  });
				  link.addEventListener('mouseout', function() {
					if (!document.body.classList.contains('link-highlight-enabled')) { 
					  this.style.backgroundColor = '';
					}
				  });
				});
			  });
			
			//highlightbuttons
			const highlightButtonsButton = document.querySelector('#buttonhighlighter');

			highlightButtonsButton.addEventListener('click', function() {
				const toggleHighlightButton = document.getElementById('toggle-button-highlight'); 
				
				const buttons = document.querySelectorAll('button');
			  
				function toggleHighlight(enabled) {
				  buttons.forEach(button => {
					button.style.backgroundColor = enabled ? "lightblue" : '';
				  });
				}
			  
				if (toggleHighlightButton) {
				  toggleHighlightButton.addEventListener('click', function() {
					const enabled = !document.body.classList.contains('button-highlight-enabled'); 
					document.body.classList.toggle('button-highlight-enabled'); 
					toggleHighlight(enabled);
				  });
				} else {
				  toggleHighlight(true);
				}
			  
				buttons.forEach(button => {
				  button.addEventListener('mouseover', function() {
					this.style.backgroundColor = "lightblue" + '80'; 
				  });
				  button.addEventListener('mouseout', function() {
					if (!document.body.classList.contains('button-highlight-enabled')) { 
					  this.style.backgroundColor = '';
					}
				  });
				});
			  });
			  
			// read focus
			const readFocusButton = document.querySelector('#readfocus');
			let readfocus = false;
			readFocusButton.addEventListener('click', function() {
				readfocus = !readfocus;
				if(readfocus){
				readFocusButton.style.backgroundColor = 'lightblue';
				topbox = document.createElement('div');
				topbox.innerHTML = document.body.innerHTML;
				topbox.className = 'black-box top-box';
				topbox.innerHTML = '';
				document.body.appendChild(topbox)
				bottombox = document.createElement('div');
				bottombox.innerHTML = document.body.innerHTML;
				bottombox.className = 'black-box bottom-box';
				bottombox.innerHTML = '';
				document.body.appendChild(bottombox);


				document.addEventListener('mousemove', function(e) {
					const topBox = document.querySelector('.top-box');
					const bottomBox = document.querySelector('.bottom-box');
					const highlightHeight = 100; 
				
					const mouseY = e.clientY;
					const topBoxHeight = mouseY - (highlightHeight / 2);
					const bottomBoxHeight = window.innerHeight - mouseY - (highlightHeight / 2);
				
					topBox.style.height = `${topBoxHeight}px`;
					bottomBox.style.height = `${bottomBoxHeight}px`;
				});
			} else {
				readFocusButton.style.backgroundColor = '';
				const topBox = document.querySelector('.top-box');
				const bottomBox = document.querySelector('.bottom-box');
				if (topBox) {
					topBox.remove();
				}
				if (bottomBox) {
					bottomBox.remove();
				}
			}

			});
			  

			//preset
			//color-blindness
			const colorBlindnessButton = document.querySelector('#colorblind'); 
			const menubar = document.querySelector('.menu');
			const dropdown = document.querySelector('.caret');
			colorBlindnessButton.addEventListener('click', function() {
				if (menubar.style.visibility === "hidden") {
					menubar.style.visibility = "visible";
					menubar.style.opacity = 1; 
					dropdown.style.transform = "rotate(180deg)";

				} else {	
					menubar.style.visibility = "hidden";
					menubar.style.opacity = 0;
					dropdown.style.transform = "rotate(0deg)";
				}
			});

			function applyColorFilter(matrix) {
				let existingStyle = document.querySelector('#colorFilterStyle');
				if (existingStyle) existingStyle.remove();
				
				const stylesheet = document.createElement('style');
				stylesheet.id = 'colorFilterStyle';
				stylesheet.textContent = `
				  .main{
					filter: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="colorBlindness"><feColorMatrix type="matrix" values="${matrix.join(' ')}" /></filter></svg>#colorBlindness');
				  }
				`;
				// make this only affect div elelment with class main
				document.head.appendChild(stylesheet);


			  }

			//Protanopia
			const protanopiaButton = document.querySelector('#Protanopia');
			protanopiaButton.addEventListener('click', function() {
				applyColorFilter([
					0.56667, 0.43333, 0, 0, 0,
					0.55833, 0.44167, 0, 0, 0,
					0, 0.24167, 0.75833, 0, 0,
					0, 0, 0, 1, 0
				  ]);
			});

			//Deuteranopia
			const deuteranopiaButton = document.querySelector('#Deuteranopia');
			deuteranopiaButton.addEventListener('click', function() {
				applyColorFilter([
					0.625, 0.375, 0, 0, 0,
					0.7, 0.3, 0, 0, 0,
					0, 0.3, 0.7, 0, 0,
					0, 0, 0, 1, 0
				  ]);
				
			});

			//Tritanopia
			const tritanopiaButton = document.querySelector('#Tritanopia');
			tritanopiaButton.addEventListener('click', function() {
				applyColorFilter([
					0.95, 0.05, 0, 0, 0,
					0, 0.43333, 0.56667, 0, 0,
					0, 0.475, 0.525, 0, 0,
					0, 0, 0, 1, 0
				  ]);
				
			});

			//Achromatopsia
			const achromatopsiaButton = document.querySelector('#Acromatopsia');
			achromatopsiaButton.addEventListener('click', function() {
				applyColorFilter([
					0.299, 0.587, 0.114, 0, 0,
					0.299, 0.587, 0.114, 0, 0,
					0.299, 0.587, 0.114, 0, 0,
					0, 0, 0, 1, 0
				  ]);
				
			});

			
			//ADHD
			const adhdButton = document.getElementById('ADHD');
			const toggleInput2 = document.querySelector('.toggle-input-2');
			adhdButton.addEventListener('click', function() {
				if(toggleInput1.checked){
					toggleInput1.checked =false;
					lowvisionbutton.click();
				}
				if(toggleInput3.checked){
					toggleInput3.checked = false;
					epilepsyButton.click();
				}
				if(toggleInput4.checked){
					toggleInput4.checked = false;
					dyslexiaButton.click();
				}
				if( toggleInput2.checked) {
					readFocusButton.click();	
				} 
			});

			//dyslexia
			const dyslexiaButton = document.getElementById('Dyslexia');
			const toggleInput4 = document.querySelector('.toggle-input-4');
			dyslexiaButton.addEventListener('click', function() {
				if(toggleInput1.checked){
					toggleInput1.checked = false;
					lowvisionbutton.click();
				}
				if(toggleInput3.checked){
					toggleInput3.checked = false;
					epilepsyButton.click();
				}
				if( toggleInput2.checked) {
					toggleInput2.checked= false;
					adhdButton.click();	
				} 
				if( toggleInput4.checked) {
					let existingStyle = document.querySelector('#FontStyle');
					if (existingStyle) existingStyle.remove();
					const stylesheet = document.createElement('style');
					stylesheet.id = 'FontStyle';
					stylesheet.textContent = `
     		       	@font-face {
                	font-family: 'OpenDyslexic';
       	        	src: url('./Src/OpenDyslexic-Regular.otf') format('truetype');
              	  	font-weight: normal;
             	   	font-style: normal;
            		}
            		.main {
              	  	font-family: Arial, Verdana, sans-serif;
             	   	line-height: 1.5;
            	    letter-spacing: 0.05em;
          			}
        			`;
					document.head.appendChild(stylesheet);	
				} 
				else{
					let existingStyle = document.querySelector('#FontStyle');
					if (existingStyle) existingStyle.remove();
				}
			});
			
			//epilepsy
			const epilepsyButton = document.getElementById('Epilepsy');
			const toggleInput3 = document.querySelector('.toggle-input-3');
			epilepsyButton.addEventListener('click', function() {
				if(toggleInput1.checked){
					toggleInput1.checked = false;
					lowvisionbutton.click();
				}
				if(toggleInput4.checked){
					toggleInput4.checked = false;
					dyslexiaButton.click();
				}
				if( toggleInput2.checked) {
					toggleInput2.checked = false;
					adhdButton.click();	
				} 
				if( toggleInput3.checked) {
					main.classList.toggle('grayscale');
				} else {	
					main.classList.remove('grayscale');
				}
			});

			//lowvision
			const lowvisionbutton = document.getElementById('lowvision');
			const toggleInput1 = document.querySelector('.toggle-input-1');

			lowvisionbutton.addEventListener('click', function() {
				if(toggleInput3.checked){
					toggleInput3.checked =false;
					epilepsyButton.click();
				}
				if(toggleInput4.checked){
					toggleInput4.checked = false;
					dyslexiaButton.click();
				}
				if( toggleInput2.checked) {
					toggleInput2.checked = false;
					adhdButton.click();	
				} 
				if( toggleInput1.checked) {
					increaseFontSizeButton.click();
					createMain.style.zoom = '120%';
				}
				else{
					document.body.style.fontSize = '';
					createMain.style.zoom = '';
				}
			});
			
			//toggle switch
			// const toggleSwitch = document.querySelector('.toggle-switch');
			// const toggleInput = document.querySelector('.toggle-input');

			// toggleSwitch.addEventListener('click', () => {
			// const isChecked = toggleInput.checked;
			// console.log('Toggle switch is:', isChecked ? 'On' : 'Off');
			// // You can add functionality here based on the toggle state (isChecked)
			// });




			// reset function
			const fontsize = document.body.style.fontSize;
			const resetButton = document.querySelector("#reset");
			resetButton.addEventListener('click', function() {

				const button = document.querySelectorAll('button');
				button.forEach(button => button.style.cursor = `auto`);
				const link = document.querySelectorAll('a');
				link.forEach(link => link.style.cursor = `auto`);

				if (main.classList.contains('grayscale')) {
					main.classList.remove('grayscale');
				}
				if (main.classList.contains('highsaturation')) {
					main.classList.remove('highsaturation');
				}
				if (main.classList.contains('lowsaturation')) {
					main.classList.remove('lowsaturation');
				}
				if (main.classList.contains('invert')) {
					main.classList.remove('invert');
				}
				document.body.style.fontSize = fontsize;
				document.body.style.letterSpacing = 'normal';
				document.body.style.lineHeight = 'normal';
				document.body.style.cursor = 'auto';
				document.body.style.backgroundColor = '';
				document.body.style.color = '';
				main.style.zoom = '100%';
				const links = document.querySelectorAll('a');
				links.forEach(link => link.style.backgroundColor = '');
				const buttons = document.querySelectorAll('button');
				buttons.forEach(button => button.style.backgroundColor = '');
				// remove top and bottom box
				const topBox = document.querySelector('.top-box');
				const bottomBox = document.querySelector('.bottom-box');
				if (topBox) {
					topBox.remove();
				}
				if (bottomBox) {
					bottomBox.remove();
				}
				// make the default backaground color for the button
				readFocusButton.style.backgroundColor = '';
				whiteCursorButton.style.backgroundColor = '';
				blackCursorButton.style.backgroundColor = '';
				readModeButton.style.backgroundColor = '';
				zoomInButton.style.backgroundColor = '';
				zoomOutButton.style.backgroundColor = '';


				// remove color filter
				let existingStyle1 = document.querySelector('#colorFilterStyle');
				if (existingStyle1) existingStyle1.remove();

				// remove font family
				let existingStyle2 = document.querySelector('#FontStyle');
				if (existingStyle2) existingStyle2.remove();
				
				if(toggleInput3.checked){
					toggleInput3.checked =false;
					epilepsyButton.click();
				}
				if(toggleInput4.checked){
					toggleInput4.checked = false;
					dyslexiaButton.click();
				}
				if( toggleInput2.checked) {
					toggleInput2.checked = false;
					adhdButton.click();	
				}
				
				if( toggleInput1.checked) {
					toggleInput1.checked = false;
					lowvisionbutton.click();	
				} 

			});

		})

		.catch(error => {
			console.error('Error fetching resources:', error);
				
		});
});