function redirect(suffix){
    if(suffix){
        suffix = '.'+suffix
    }
    url = "Klassen/"+document.forms["classSelection"]["classes"].value+suffix
    window.location.href = url;
    return false;
}