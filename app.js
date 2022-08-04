const transition = document.querySelector(".transition");
const optionWrappers = document.querySelectorAll(".option-wrapper");
const options = document.querySelectorAll(".option");
const formTitle = document.querySelector(".form__title");
const formDescription = document.querySelector(".form__description");
const formWorkTime = document.querySelector(".form__time");
const backOffPage = document.querySelector(".go-back");
const additionalInformationHandler = document.querySelectorAll(
  ".additional-information__handler"
);
const additionalInformations = document.querySelectorAll(
  ".additional-information"
);

let previousPageData = "courses";

window.onload = () => {
  transition.classList.add("inactive");
};

backOffPage.addEventListener("click", () => {
  backOffPage.setAttribute("disabled", true);
  setTimeout(() => {
    handlePageTransition();
    optionWrappers.forEach((wrapper) => wrapper.classList.remove("active"));

    setTimeout(() => {
      Array.from(optionWrappers)
        .find((wrapper) => wrapper.dataset.site === previousPageData)
        .classList.add("active");
      if (previousPageData === "korepetycje-z-informatyki") {
        previousPageData = "courses";
      }
      if (previousPageData === "kurs-maturalny") {
        previousPageData = "courses";
      }
      if (previousPageData === "mature-zdaje") {
        previousPageData = "kurs-maturalny";
      }
      setTimeout(() => {
        options.forEach((option) => option.classList.remove("move-out"));
        backOffPage.removeAttribute("disabled");
      }, 1);
    }, 500);
  }, 700);
});

function handlePageTransition() {
  transition.classList.remove("inactive");
  setTimeout(() => {
    transition.classList.add("inactive");
  }, 600);
}
function handlerFormTitle() {
  options.forEach((option) => {
    option.addEventListener("click", () => {
      previousPageData = option.dataset.previous;

      switch (option.dataset.form) {
        case "korepetycje":
          formTitle.textContent = "KURS INDYWIDUALNY";
          break;
        case "sam-na-sam":
          formTitle.textContent = "KURS INDYWIDUALNY AMBITNY";
          formWorkTime.textContent = "60 minut / tydzień ";
          formDescription.textContent =
            "Praca domowa po każdych zajęciach Materiały podstawowe w cenie kursu Możliwość konsultacji między zajęciami Dostęp do prywatnej grupy szkolnej";
          break;
        case "kameralna-grupa":
          formTitle.textContent = "KURS GRUPOWY AMBITNY";
          formWorkTime.textContent = "90 minut / tydzień";
          formDescription.textContent =
            "Praca domowa po każdych zajęciach Dodatkowe prace domowe dla chętnych Materiały podstawowe i rozszerzone w cenie kursu.          Możliwość konsultacji między zajęciami Dostęp do prywatnej grupy szkolnej";
          break;
        case "samodzielnie-w-domu":
          formTitle.textContent = "AMBITNY KURS WYKŁADOWY";
          formWorkTime.textContent = "120 minut / tydzień";
          formDescription.textContent =
            "Praca domowa po każdych zajęciach Dodatkowe prace domowe dla chętnych Materiały podstawowe i rozszerzone w cenie kursu.          Możliwość konsultacji między zajęciami Dostęp do prywatnej grupy szkolnej.";
          break;
      }
    });
  });
}

options.forEach((option) => {
  option.addEventListener("click", (e) => {
    if (
      e.target === option.querySelector(".additional-information__handler") ||
      e.target === option.querySelector(".additional-information")
    ) {
      return;
    }

    handlerFormTitle();
    additionalInformations.forEach((information) =>
      information.classList.remove("active")
    );
    Array.from(options).forEach((option) => option.classList.add("move-out"));
    option.classList.remove("move-out");
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

additionalInformationHandler.forEach((handler) => {
  handler.addEventListener("click", () => {
    additionalInformations.forEach((information) =>
      information.classList.remove("active")
    );
    handler.nextElementSibling.classList.add("active");
  });
});
