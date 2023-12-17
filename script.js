const ACTIVE_MAIN_BOX_CLASS = "active-item-box";
const ACTIVE_SECTION_BOX_CLASS = "active-section-box"

const getElementByClass = (class_name) => {
    let elements = document.getElementsByClassName(class_name);
    return [...elements]
}

function boxEventHandler(event, id){
    event.stopPropagation()
    let element = document.getElementById(id);
    let active_class = getElementByClass(ACTIVE_MAIN_BOX_CLASS)
    if(active_class.length){
        active_class.forEach(i => {
            const [,secondSection] = i.children;
            if(secondSection){
                secondSection.classList.remove(ACTIVE_SECTION_BOX_CLASS)
            }
            i.classList.remove(ACTIVE_MAIN_BOX_CLASS)
        })
    }
    element.classList.add(ACTIVE_MAIN_BOX_CLASS);
    const [,secondSection] = element.children;
    secondSection.classList.add(ACTIVE_SECTION_BOX_CLASS)
}
