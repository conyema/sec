// const estateList = document.querySelectorAll(".estate-item");
// const imageList = document.querySelectorAll(".img-item");
const menuBtns = document.querySelectorAll(".menu-btn");
const forms = document.querySelectorAll(".form");
const msgBox = document.getElementById('msg-box');
const imgInput = document.getElementById('image');

// Show image in preview box
const viewImage = (e) => {
  const file = e.currentTarget.files[0];
  const imgPreview = document.getElementById('img-preview');
  imgPreview.src = URL.createObjectURL(file);
}

/**
 *  Displays notification message or alert
 * @param {Object} result - The status and message of an HTTP Request
 */
const showStatus = (result) => {
  const { status, message = '', errors = [] } = result;
  let errList = "";

  if (errors.length) {
    errors.forEach(err => {
      errList += `<list class="text-danger d-block small">[${err.param}] - ${err.msg}</list>`
    });
  }

  msgBox.innerHTML = (`
    <h6 class="text-${status == "success" ? "success" : "danger"}">${status}</h6>
    <p class="small">${message}</p>
    <ul>${errList}</ul>
  `);

  msgBox.classList.toggle("d-none");

  setTimeout(() => {
    msgBox.classList.toggle("d-none");
    msgBox.innerHTML = "";
  }, 5000);
}

/**
 *  Displays errorss in form submission
 * @param {Array} errorss - A group of form submission errors(s)
 * @param {} errBox - HTML element to display errors(s)
 */
//  const showErrors = (errors, errBox) => {
//    let errList = "";

//   errors.forEach(err => {
//     // let span = document.createElement("span");
//     // span.append(    `
//     //   <li class="small">
//     //     <span class="text-danger">${err.param}</span>${err.msg}
//     //   </li>
//     // `);
//     errList +=`<list class="text-danger d-block small">*${err.param} - ${err.msg}</span>`

//   });

//   errBox.innerHTML = errList;
//   errBox.classList.toggle("d-none");

//   // setTimeout(() => {
// 	// 	errBox.innerHTML = "";
// 	// 	errBox.classList.toggle("d-none");
//   // }, 5000);
// }


/**
 *  Returns a (JSON) response from an HTTP request usinf Fetch
 * @param {string} uri - location of the resource
 * @param {Object} options - optional AJAX parameters
 */
const ajaxRequest = async (url, options = {}) => {
  let response = await fetch(url, options);
  let result = await response.json();

  return result;
}

const handleBtnClick = async (e) => {
  // e.preventDefault();
  const { id, method, uri } = e.currentTarget.dataset;
  const entityElem = document.getElementById(id);
  const options = {
    method,
  };

  let result = await ajaxRequest(uri, options);

  showStatus(result);

  // Request successful and a 'DELETE' action
  let isDeleted = method === "DELETE" && result.status === "success";

  if (isDeleted) {
    // Remove entity from DOM
    entityElem.remove();
  }
}

const handleFormSubmit = async (e) => {
  e.preventDefault();

  const form = e.currentTarget;
  // const errorsBox = form.lastChild;
  const { uri, method } = form.dataset;
  const formData = new FormData(form);
  const options = {
    method,
    body: formData
  };

  // let result = await ajaxRequest(uri, ajaxOptions[action]);
  let result = await ajaxRequest(uri, options);

  showStatus(result);

  if (result.status === "success") {
    // Reset form if request is a success
    form.reset();
  }
}


/**
 *  Event Listeners
 */

if (imgInput) {

  // Append a change event handler to preview image(file)
  imgInput.addEventListener("change", viewImage, false);
}

if (menuBtns) {

  // Append a click event handler to menu buttons
  menuBtns.forEach((btn) => {
    btn.addEventListener('click', handleBtnClick);
  });
}

if (forms) {

  // Append a submit event handler to forms
  forms.forEach(form => {
    form.addEventListener('submit', handleFormSubmit)
  });
}
