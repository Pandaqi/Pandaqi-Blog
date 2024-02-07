export default () => {
    const tocToggle = document.getElementById('toc-toggle');
    const toc = document.getElementById('table-of-contents');
    if(!tocToggle || !toc) { return; }

    tocToggle.addEventListener('click', function(ev) {
        if(tocToggle.innerHTML == 'Show')
        {
            toc.style.display = 'block';
            tocToggle.innerHTML = 'Hide';
        } else {
            toc.style.display = 'none';
            tocToggle.innerHTML = 'Show';
        }
        ev.preventDefault();
        return false;
    });
    
    // we do this via code, so the table of contents IS visible to those with JavaScript disabled
    toc.style.display = 'none';
}