const inputBox = document.getElementById("input-box");
const listcContainer = document.getElementById("list-container");

function addTask(){
  if(inputBox.value === ''){
    alert("You must write something!");
  }
  else{
    let li = document.createElement("li"); //DOM 생성
    li.innerHTML = inputBox.value; 
    listcContainer.appendChild(li);
    li.appendChild(addEditBtn());
    li.appendChild(addRemoveBtn());
  }
  inputBox.value = "";
  saveDate();
}

function addEditBtn(){
  let edit = document.createElement("edit");
  edit.setAttribute("class","fa-solid fa-pen");
  return edit;
}

function addRemoveBtn(){
  let remove = document.createElement("remove");
  remove.setAttribute("class","fa-solid fa-trash");
  return remove;
}


listcContainer.addEventListener("click", function(e){
  if(e.target.tagName === "LI"){
    e.target.classList.toggle("checked");
    saveDate();
  }
  else if(e.target.tagName === "REMOVE"){
    // REMOVE 요소가 클릭되었을 때, 해당 요소의 부모 요소를 삭제하고 변경사항을 저장
    e.target.parentElement.remove();
    saveDate();
  }
  else if(e.target.tagName === "EDIT"){
    // EDIT 요소가 클릭되었을 때, 수정 기능을 활성화
    let li = e.target.parentElement; // 클릭된 요소의 부모 LI 요소를 가져옴
    let taskText = li.innerText; // 현재 할 일 항목의 텍스트를 가져옴

    // 수정을 위한 입력 필드와 저장 버튼을 생성
    let editInput = document.createElement("input");
    editInput.value = taskText;
    let saveButton = document.createElement("save");
    saveButton.setAttribute("class","fa-solid fa-check");
    saveButton.addEventListener("click", function () {
      // 저장 버튼을 클릭하면 입력 내용을 업데이트하고 입력 필드를 숨깁니다.
      taskText = editInput.value;
      li.innerText = taskText;
      li.appendChild(addEditBtn()); // EDIT 버튼을 다시 추가합니다.
      li.appendChild(addRemoveBtn());
      saveButton.remove(); // 저장 버튼을 제거합니다.
      editInput.remove(); // 입력 필드를 제거합니다.
      saveDate();
    });

    // 할 일 항목에 입력 필드와 저장 버튼을 추가합니다.
    li.innerText = '';
    li.appendChild(editInput);
    li.appendChild(saveButton);
    
  }
}, false);

function saveDate(){
  localStorage.setItem("data", listcContainer.innerHTML);
}

function showTask(){
  listcContainer.innerHTML = localStorage.getItem("data");
}
showTask();