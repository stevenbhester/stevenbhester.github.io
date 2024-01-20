const sortableList = document.querySelector(".sortable-list");
const items = sortableList.querySelectorAll(".item");

items.forEach(item => {
  item.addEventListener("dragstart", () => {
    console.log("Dragging element "+item.textContent);
    // Adding dragging class to item after a delay
    setTimeout(() => item.classList.add("dragging"), 0);
  });
  item.addEventListener("touchmove", () => {
    console.log("Dragging element "+item.textContent);
    // Adding dragging class to item after a delay
    setTimeout(() => item.classList.add("dragging"), 0);
  });
  // Removing dragging class from item on dragend event
  item.addEventListener("dragend", () => item.classList.remove("dragging"));
  item.addEventListener("touchend", () => item.classList.remove("dragging"));
});

const initSortableList = (e) => {
  e.preventDefault();
  console.log("initSortableList fired");
  
  const draggingItem = document.querySelector(".dragging"); 
  console.log("initSortableList detected at "+e.clientY);
    
  // Getting all items except currently dragging and making array of them
  let siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];
  console.log("siblings pulled");
  
  // Finding the sibling after which the dragging item should be placed
  let nextSibling = null;
  let priorSibling = null;
  siblings.forEach(sibling => {
    let rect = sibling.getBoundingClientRect();
    let yCoord = rect.top + sibling.offsetHeight/2;
    console.log("Comparing drag element at "+e.clientY+" to sibling "+sibling.textContent.trim()+" at "+ yCoord + " (rect: " + rect.top + "; offsetHeight/2: "+(sibling.offsetHeight/2));
    if (e.clientY >= yCoord && (!priorSibling || yCoord < priorSibling.getBoundClientRect().top + priorSibling.offsetHeight/2)) {
        priorSibling = sibling;
    } else if (e.clientY < yCoord && (!nextSibling || yCoord < nextSibling.getBoundClientRect().top + nextSibling.offsetHeight/2)) {
        nextSibling = sibling;
    }
  });
  console.log("Found prior sibling "+priorSibling.textContent.trim()+" and next sibling "+nextSibling.textContent.trim());
  
  // Inserting the dragging item before the found sibling
  if(nextSibling) {
    sortableList.insertBefore(draggingItem, nextSibling);
    console.log("Inserted drag element before next sibling");
  } else if (priorSibling) {
    sortableList.insertAfter(draggingItem, priorSibling);
    console.log("Inserted drag element after prior sibling");
  } else { console.log("No prior or next sibling found for insertion"); }
};


sortableList.addEventListener("dragover", initSortableList);
sortableList.addEventListener("dragenter", e => e.preventDefault());
