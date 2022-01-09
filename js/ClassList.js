let options = []
const CLASSES_PER_YEAR = 2
const CLASSES = "abcdefghijklmnopqrstuvwxyz".substr(0,CLASSES_PER_YEAR).split("")

/** returns an array of option objects */
function getOptions(relativePrefix, absolutePrefix) {
    let options = []
    

    CLASSES.forEach(suffix => {
        options.push({
            relative : relativePrefix + suffix,
            absolute : absolutePrefix + suffix
        })
    })
    return options
}

function getSchoolYear(date) {
    year = date.getFullYear()
    month = date.getMonth()+1

    if(month < 8){
        year--
    }
    return year
}

for (let j = 1; j <= 3; j++) {
    
    /** the year we are in now */
    let thisYear = getSchoolYear(new Date())
    /** the last 2 digits of the year we are in now */
    let thisYearShort = parseInt(thisYear.toString().substr(-2))
    /** the last 2 digits of the year I_a got into the ims*/
    let absoluteYear = thisYearShort - j + 1

    /** the first two letters for the relative class name */
    let relativePrefix = "I"+j
    /** the last three letters for the absolute class name */
    let absolutePrefix = "I"+absoluteYear
    
    getOptions(relativePrefix, absolutePrefix).forEach(option => { //for each class of that year
        options.push(option)
    })
}
options.forEach(option =>{
    let classes= document.getElementById("classes")
    classes.appendChild(
        new Option(option.relative+" / "+option.absolute, option.absolute)
    )
})