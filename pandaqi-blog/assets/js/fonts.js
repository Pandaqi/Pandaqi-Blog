var fonts = document.createElement('link');
fonts.rel = 'stylesheet';
fonts.href = "https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,500;0,900;1,500&family=Dosis:wght@500;800&display=swap";

var godefer = document.getElementsByTagName('link')[0];
godefer.parentNode.insertBefore(fonts, godefer);
