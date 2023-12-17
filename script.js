const ACTIVE_MAIN_BOX_CLASS = "active-item-box";
const ACTIVE_SECTION_BOX_CLASS = "active-section-box";
const ACTIVE_OVERFLOW_BOX_CLASS = "active-item-box-overflow";

const getElementByClass = (class_name) => {
    let elements = document.getElementsByClassName(class_name);
    return [...elements]
}


function boxEventHandler(event, id){
    event.stopPropagation()
    let element = document.getElementById(id);
    const [firstEle ] = element.children;
    const [ inputEle ] = firstEle.children;
    
    let active_class = getElementByClass(ACTIVE_MAIN_BOX_CLASS)
    if(active_class.length){
        active_class.forEach(i => {
            const [firstSection,secondSection] = i.children;
            if(firstSection){
                const [ inputEle ] = firstSection.children;
                inputEle.checked = false; // reset checked input
            }
            if(secondSection){
                secondSection.classList.remove(ACTIVE_SECTION_BOX_CLASS) // reset action section class
            }
            i.classList.remove(ACTIVE_MAIN_BOX_CLASS);
            i.classList.remove(ACTIVE_OVERFLOW_BOX_CLASS);
        })
    }
    const [,secondSection] = element.children;
    secondSection.classList.add(ACTIVE_SECTION_BOX_CLASS);
    element.classList.add(ACTIVE_MAIN_BOX_CLASS);
    setTimeout(() => {
        element.classList.add(ACTIVE_OVERFLOW_BOX_CLASS);
    }, 100)
    inputEle.checked = true;
}

function selectHandler(event, second_class){
    event.stopPropagation()
    const { target } = event;
    let targetElement = (target?.tagName === 'DIV') ? target.children : target?.parentElement?.children
    const [selectViewContent,arrow, selectMenu] = targetElement ?? [];

    selectMenu.classList.toggle(second_class)

    const handleSelectMenuItem = (e) => { 
        e?.stopPropagation();
        selectViewContent.textContent = e.target.textContent;
        handleArrowToggle(arrow);

        [...selectMenu.children].forEach(i => { // Once item selected remove the event listner form select menu!
            i?.removeEventListener('click', handleSelectMenuItem)
        });
        selectMenu.classList.toggle(second_class); 
    }
    const handleSelectMenuPaper = (element) => { // Open select menu and add eveent listner to every menu
        [...element.children].forEach(i => {
            i?.addEventListener('click', handleSelectMenuItem)
        })
    }

    const handleArrowToggle = (element) => {
        element.classList.toggle('toggle-arrow');
    }
    handleArrowToggle(arrow);
    selectMenu && handleSelectMenuPaper(selectMenu)
}
