function redirect(){
    url = "Klassen/"+document.forms["classSelection"]["classes"].value+".pdf"
    window.location.href = url;
    return false;
}