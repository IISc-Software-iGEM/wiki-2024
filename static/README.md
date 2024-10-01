### Accessibility Toolbar Plugin 

#### This Accessibility Tool is made under iGEM Project. A JavaScript-based tool which can enhance the accessibility of web content for users with disabilities. We have added the accessiblities features such that it will help them format the webcontent according to thier specific disbalities or setting things manually. 
<br>

This tool has been divided into its respective sections to allow the user to navigate the features they want to use easily. 

#### Features
* **Presets**
    1. **Color-Blindness**
        1. **Protanopia**: Simulates Red-Green Color blindness.
        2. **Deutranopia**: Simulates another type of red-green blindness
        3. **Tritanopia**: Simulates blue-yellow color blindness.
        4. **Acromatopsia**: Simulates complete color blindness.
     2. **Low-Vision**: Adjust the visual elements for user with low vision.
     3. **ADHD**: Implements features to reduce distractions for users with ADHD.
     4. **Dyslexia**: Provides options to improve the readability of the user with Dyslexia.
     5. **Epilepsy**: Minimizes  elements that could trigger the seizures.
* **Contrast**
    1. **Invert-Color**: Flips the color of the webpage
    2. **Grayscale**: Removes the color of the webpage essentially making it black-white.
    3. **Low-Saturation**: Reduces the color-intensity of the webpage.
    4. **HIgh-Saturation**: Increases the color_intensity
 * **Cursor**
    1. **White-Cursor** : Changes your Display Cursor to *White* in color.
    2. **Black-Cursor** : Changes your Display Cursor to *Black* in color.
 * **Font**
    1. **Increase-Font-Size** : Increases the size of the font by *10px* of the web-content.
    2. **Decrease-Font-Size** : Decreases the size of the font by *10px* of the web-content.
    3. **Text-Width**: Increases the space between the words.
    4. **Line-Height**: Increase the space between the lines.
 * **General**
    1. **Zoom-In** : Zooms-in the page by 50% *(i.e to 150%)*.
    2. **Zoom-Out** : Zooms-out the page by 50% *(i.e to 50%)*.
    3. **Link-Highlight**: Highlights all the links on the webpage. These highlighted links will be unhighlighted once you hover over them.
    4. **Read-Mode**: Converts the background color of the webpage to black and font color to white.
    5. **Button-Highlight**: Highlights all the buttons on the webpage. This highlighted button will be unhighlighted once you hover over it.
    6. **Read-Focus**: Allows users to highlight a specific area of the page by moving the mouse.
 * **Reset**: The user can restore the webpage to its default appearance and behavior.

### Integeration

* Clone the repo in the Static directory of your website *(for flask framework)*.
```bash
https://github.com/IISc-Software-iGEM/Accessibility-Tool.git
```
* Paste this in the header section of the layout page.
```bash
<script src="{{ url_for('static', filename = 'Functions.js')}}"></script>
```

#### Rules and Regulations
* If you are using our tool, Please give us credit for using.

*~ IISc-Software*








