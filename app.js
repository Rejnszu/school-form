const transition = document.querySelector(".transition");
const optionWrappers = document.querySelectorAll(".option-wrapper");
const options = document.querySelectorAll(".option");
const formTitle = document.querySelector(".form__title");

window.onload = () => {
  transition.classList.add("inactive");
  // Array.from(optionWrappers)
  //   .find((option) => option.dataset.site === "courses")
  //   .classList.add("active");
};

function handlePageTransition() {
  transition.classList.remove("inactive");
  setTimeout(() => {
    transition.classList.add("inactive");
  }, 600);
}
function handlerFormTitle() {
  options.forEach((option) => {
    option.addEventListener("click", () => {
      switch (option.dataset.form) {
        case "korepetycje":
          formTitle.textContent = "KURS INDYWIDUALNY";
          break;
        case "sam-na-sam":
          formTitle.textContent = "KURS INDYWIDUALNY AMBITNY";
          break;
        case "kameralna-grupa":
          formTitle.textContent = "KURS GRUPOWY AMBITNY";
          break;
        case "samodzielnie-w-domu":
          formTitle.textContent = "AMBITNY KURS WYKŁADOWY";
          break;
      }
    });
  });
}

options.forEach((option) => {
  option.addEventListener("click", (e) => {
    handlerFormTitle();
    Array.from(options)
      .filter((option) => option !== e.target)
      .forEach((option) => option.classList.add("move-out"));
    setTimeout(() => {
      handlePageTransition();
      optionWrappers.forEach((wrapper) => wrapper.classList.remove("active"));

      setTimeout(() => {
        Array.from(optionWrappers)
          .find((wrapper) => wrapper.dataset.site === option.dataset.choice)
          .classList.add("active");
        setTimeout(() => {
          options.forEach((option) => option.classList.remove("move-out"));
        }, 1);
      }, 500);
    }, 700);
  });
});

// const moreInformationHandler = document.querySelectorAll(".more-info");
// const informations = document.querySelectorAll(".test__span");

// moreInformationHandler.forEach((informationHandler) => {
//   informationHandler.addEventListener("click", () => {
//     informations.forEach((information) => {
//       information.classList.remove("active");
//     });
//     informationHandler.nextElementSibling.classList.add("active");
//   });
// });
