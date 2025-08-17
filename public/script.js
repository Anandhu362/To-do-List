var form = document.getElementById("todoForm");
var input = document.getElementById("taskInput");
var list = document.getElementById("taskList");
var addBtn = document.getElementById("addBtn");
var emptyHint = document.getElementById("emptyHint");
function updateAddButton() {
  addBtn.disabled = input.value.trim().length === 0;
}
function refreshEmptyHint() {
  emptyHint.style.display = list.children.length === 0 ? "block" : "none";
}
input.addEventListener("input", updateAddButton);
form.addEventListener("submit", function (e) {
  e.preventDefault();
  var text = input.value.trim();
  if (!text) return;
  var li = document.createElement("li");
  li.className = "task";
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.setAttribute("aria-label", "Mark task completed");
  var span = document.createElement("span");
  span.className = "title";
  span.textContent = text;
  var del = document.createElement("button");
  del.className = "delete-btn";
  del.type = "button";
  del.textContent = "Delete";
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(del);
  list.appendChild(li);
  input.value = "";
  updateAddButton();
  refreshEmptyHint();
});
list.addEventListener("click", function (e) {
  var target = e.target;
  if (target.matches('input[type="checkbox"]')) {
    var item = target.closest(".task");
    target.checked ? item.classList.add("completed") : item.classList.remove("completed");
  }
  if (target.matches(".delete-btn")) {
    var li = target.closest(".task");
    if (li) {
      li.classList.add("task-fading-out");
      setTimeout(function() {
        li.remove();
        refreshEmptyHint();
      }, 300);
    }
  }
});
updateAddButton();
refreshEmptyHint();