const transition = document.querySelector(".transition");
const optionWrappers = document.querySelectorAll(".option-wrapper");
const options = document.querySelectorAll(".option");
const formTitle = document.querySelector(".form__title");
const formDescription = document.querySelector(".form__description");
const formWorkTime = document.querySelector(".form__time");
const backOffPage = document.querySelector(".go-back");
const coursesDiv = document.querySelector('[data-site="courses"]');
const currentStage = document.querySelector(".counter");
let counter = 1;
const additionalInformationHandler = document.querySelectorAll(
  ".additional-information__handler"
);
const additionalInformations = document.querySelectorAll(
  ".additional-information"
);

let previousPageData = "courses";

window.onload = () => {
  Array.from(optionWrappers)
    .find((wrapper) => wrapper.dataset.site === "courses")
    .classList.add("fade-in");
};

function checkIfReverseButtonIsDisplayed() {
  if (coursesDiv.classList.contains("fade-in")) {
    backOffPage.classList.add("inactive");
  } else {
    backOffPage.classList.remove("inactive");
  }
}

backOffPage.addEventListener("click", () => {
  backOffPage.setAttribute("disabled", true);
  additionalInformations.forEach((information) =>
    information.classList.remove("active")
  );

  Array.from(optionWrappers)
    .find((optionWrapper) => optionWrapper.classList.contains("fade-in"))
    .classList.remove("fade-in");

  setTimeout(() => {
    Array.from(optionWrappers)
      .find((wrapper) => wrapper.dataset.site === previousPageData)
      .classList.add("fade-in");
    Array.from(optionWrappers)
      .find((wrapper) => wrapper.dataset.site === previousPageData)
      .classList.remove("fade-out");
    if (previousPageData === "korepetycje-z-informatyki") {
      previousPageData = "courses";
    }
    if (previousPageData === "kurs-maturalny") {
      previousPageData = "courses";
    }
    if (previousPageData === "mature-zdaje") {
      previousPageData = "kurs-maturalny";
    }
    if (previousPageData === "kurs-ambitny") {
      previousPageData = "kurs-maturalny";
    }
    setTimeout(() => {
      options.forEach((option) => option.classList.remove("move-out"));
      backOffPage.removeAttribute("disabled");
      checkIfReverseButtonIsDisplayed();
      counter--;
      currentStage.textContent = counter;
    }, 1);
  }, 300);
});

function FormHandler() {
  options.forEach((option) => {
    option.addEventListener("click", (e) => {
      if (
        e.target === option.querySelector(".additional-information__handler") ||
        e.target === option.querySelector(".additional-information")
      ) {
        return;
      }
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
        case "sam-na-sam-plus":
          formTitle.textContent = "KURS INDYWIDUALNY AMBITNY PLUS";
          formWorkTime.textContent = "120 minut / tydzień ";
          formDescription.textContent =
            "Praca domowa po każdych zajęciach. Dodatkowe prace domowe dla chętnych. Materiały podstawowe i rozszerzone w cenie kursu. Możliwość konsultacji między zajęciami. Dostęp do prywatnej grupy szkolnej.";
          break;
        case "kameralna-grupa":
          formTitle.textContent = "KURS GRUPOWY AMBITNY";
          formWorkTime.textContent = "90 minut / tydzień";
          formDescription.textContent =
            "Praca domowa po każdych zajęciach. Dodatkowe prace domowe dla chętnych Materiały podstawowe i rozszerzone w cenie kursu. Możliwość konsultacji między zajęciami Dostęp do prywatnej grupy szkolnej";
          break;
        case "samodzielnie-w-domu":
          formTitle.textContent = "KURS AMBITNY WYKŁADOWY";
          formWorkTime.textContent = "120 minut / tydzień";
          formDescription.textContent =
            "Praca domowa po każdych zajęciach. Dodatkowe prace domowe dla chętnych Materiały podstawowe i rozszerzone w cenie kursu. Możliwość konsultacji między zajęciami Dostęp do prywatnej grupy szkolnej.";
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

    FormHandler();
    additionalInformations.forEach((information) =>
      information.classList.remove("active")
    );
    Array.from(options).forEach((option) => option.classList.add("move-out"));
    option.classList.remove("move-out");
    setTimeout(() => {
      option.parentElement.classList.remove("fade-in");
      option.parentElement.classList.add("fade-out");

      setTimeout(() => {
        Array.from(optionWrappers)
          .find((wrapper) => wrapper.dataset.site === option.dataset.choice)
          .classList.add("fade-in");

        checkIfReverseButtonIsDisplayed();

        options.forEach((option) => option.classList.remove("move-out"));
        counter++;
        currentStage.textContent = counter;
      }, 400);
    }, 500);
  });
});

additionalInformationHandler.forEach((handler) => {
  handler.addEventListener("click", () => {
    handler.nextElementSibling.classList.toggle("active");
  });
});
