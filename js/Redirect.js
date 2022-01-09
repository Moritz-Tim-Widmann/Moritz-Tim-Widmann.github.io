function redirect(suffix){
    url = "Klassen/"+document.forms["classSelection"]["classes"].value+"."+suffix
    window.location.href = url;
    return false;
}