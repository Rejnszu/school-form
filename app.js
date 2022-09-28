import smoothscroll from "./scrollPolyfill";

// kick off the polyfill!
smoothscroll.polyfill();

const transition = document.querySelector(".transition");
const optionWrappers = document.querySelectorAll(".option-wrapper");
const options = document.querySelectorAll(".option");
const formTitle = document.querySelector(".form__title");
const formInputs = document.querySelectorAll(".form input");
const formDescription = document.querySelector(".form__description");
const formWorkTime = document.querySelector(".form__time");
const backOffPage = document.querySelector(".go-back");
const coursesDiv = document.querySelector('[data-site="courses"]');
const currentStage = document.querySelector(".counter");
const coursesPage = document.querySelector(".courses-page");
const startingPage = document.querySelector(".starting-page");

const choosenCourseinformationInput = document.getElementById(
  "choosen-course-information-input"
);
const choosenWayinformationInput = document.getElementById(
  "choosen-way-information-input"
);
const startSelectingCourses = document.querySelector(
  ".start-selecting-courses"
);
const additionalInformationHandler = document.querySelectorAll(
  ".additional-information__handler"
);
const additionalInformations = document.querySelectorAll(
  ".additional-information"
);
const currentStageDescription = document.querySelector(".kroki__description");

let counter = 1;
let previousPageData = "courses";

function currentStageDescriptionHandler(option) {
  switch (option.dataset.choice) {
    case "korepetycje-z-informatyki":
      currentStageDescription.textContent = "W czym możemy ci pomóc?";
      backOffPage.style.top = "70%";
      break;
    case "zwykly-formularz":
      currentStageDescription.textContent = "Skontaktuj się z nami.";
      backOffPage.style.top = "90%";
      break;
    case "textarea-formularz":
      currentStageDescription.textContent = "Opisz jakiego kursu szukasz.";
      backOffPage.style.top = "85%";
      break;
    case "kurs-maturalny":
      currentStageDescription.textContent = "Jaki tryb pracy ci pasuje?";
      backOffPage.style.top = "70%";
      break;
    case "kurs-ambitny":
      currentStageDescription.textContent =
        "Jaka intensywność kursu cię interesuje?";
      backOffPage.style.top = "80%";
      break;
    case "kurs-ambitny-grupowy":
      currentStageDescription.textContent =
        "Jaka intensywność kursu cię interesuje?";
      backOffPage.style.top = "80%";
      break;
    case "mature-zdaje":
      currentStageDescription.textContent = "Kiedy zdajesz maturę?";
      backOffPage.style.top = "70%";
      break;
  }
}
function currentStageDescriptionReverse() {
  const currentOptionsDataSite = Array.from(optionWrappers).find((wrapper) =>
    wrapper.classList.contains("fade-in")
  ).dataset.site;
  switch (currentOptionsDataSite) {
    case "courses":
      currentStageDescription.textContent = "Jaki jest twój cel?";
      backOffPage.style.top = "70%";
      break;

    case "korepetycje-z-informatyki":
      currentStageDescription.textContent = "W czym możemy ci pomóc?";
      backOffPage.style.top = "70%";
      break;
    case "kurs-maturalny":
      currentStageDescription.textContent = "jaki tryb pracy ci pasuje?";
      backOffPage.style.top = "70%";
      break;
    case "mature-zdaje":
      currentStageDescription.textContent = "Kiedy zdajesz maturę?";
      backOffPage.style.top = "70%";
      break;
    case "kurs-ambitny":
      currentStageDescription.textContent =
        "Jaka intensywność kursu cię interesuje?";
      backOffPage.style.top = "80%";
      break;
    case "kurs-ambitny-grupowy":
      currentStageDescription.textContent =
        "Jaka intensywność kursu cię interesuje?";
      backOffPage.style.top = "80%";
      break;
  }
}

startSelectingCourses.addEventListener("click", () => {
  startingPage.classList.add("fade-out");
  coursesPage.style.display = "block";
  setTimeout(() => {
    coursesPage.classList.add("fade-in");
    Array.from(optionWrappers)
      .find((wrapper) => wrapper.dataset.site === "courses")
      .classList.add("fade-in");

    startingPage.style.display = "none";
  }, 300);
});

function checkIfReverseButtonIsDisplayed() {
  if (coursesDiv.classList.contains("fade-in")) {
    backOffPage.classList.add("inactive");
  } else {
    backOffPage.classList.remove("inactive");
  }
}

backOffPage.addEventListener("click", () => {
  formInputs.forEach((input) => (input.value = ""));

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
    if (previousPageData === "kurs-ambitny-grupowy") {
      previousPageData = "kurs-maturalny";
    }
    setTimeout(() => {
      options.forEach((option) => option.classList.remove("move-out"));
      backOffPage.removeAttribute("disabled");
      checkIfReverseButtonIsDisplayed();
      currentStageDescriptionReverse();
      counter--;
      currentStage.textContent = counter;

      setTimeout(() => {
        coursesPage.scrollIntoView({ behavior: "smooth" });
      }, 400);
    }, 1);
  }, 300);
});

function formHandler() {
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
          formDescription.innerHTML = "";
          formWorkTime.textContent = "";
          choosenCourseinformationInput.value = "KURS INDYWIDUALNY";
          choosenWayinformationInput.value = option.querySelector(
            ".course-description"
          ).textContent;
          break;
        case "sam-na-sam":
          formTitle.textContent = "KURS INDYWIDUALNY AMBITNY";
          formWorkTime.textContent = "60 minut / tydzień ";
          formDescription.innerHTML =
            "<ul><li>Praca domowa po każdych zajęciach</li> <li> Materiały podstawowe w cenie kursu</li> <li>Możliwość konsultacji między zajęciami</li> <li>Dostęp do prywatnej grupy szkolnej</li></ul>";
          choosenCourseinformationInput.value = "KURS INDYWIDUALNY AMBITNY";
          choosenWayinformationInput.value =
            "Wolę pracować sam na sam z korepetytorem";
          break;
        case "sam-na-sam-plus":
          formTitle.textContent = "KURS INDYWIDUALNY AMBITNY PLUS";
          formWorkTime.textContent = "120 minut / tydzień ";
          formDescription.innerHTML =
            "<ul><li>Praca domowa po każdych zajęciach</li> <li>Dodatkowe prace domowe dla chętnych</li> <li>Materiały podstawowe i rozszerzone w cenie kursu</li> <li>Możliwość konsultacji między zajęciami</li> <li>Dostęp do prywatnej grupy szkolnej</li></ul>";
          choosenCourseinformationInput.value =
            "KURS INDYWIDUALNY AMBITNY PLUS";
          choosenWayinformationInput.value =
            "Wolę pracować sam na sam z korepetytorem";
          break;
        case "kurs-ambitny-grupowy":
          formTitle.textContent = "KURS GRUPOWY AMBITNY";
          formWorkTime.textContent = "90 minut / tydzień";
          formDescription.innerHTML =
            "<ul><li>Praca domowa po każdych zajęciach <li>Dodatkowe prace domowe dla chętnych</li> <li>Materiały podstawowe i rozszerzone w cenie kursu</li> <li>Możliwość konsultacji między zajęciami</li> <li>Dostęp do prywatnej grupy szkolnej</li></ul>";
          choosenCourseinformationInput.value = "KURS GRUPOWY AMBITNY";
          choosenWayinformationInput.value =
            "Wole pracować w kameralnej grupie";
          break;
        case "kurs-ambitny-grupowy-plus":
          formTitle.textContent = "KURS GRUPOWY AMBITNY PLUS";
          formWorkTime.textContent = "90 minut / tydzień";
          formDescription.innerHTML =
            "<ul><li>Praca domowa po każdych zajęciach <li>Dodatkowe prace domowe dla chętnych</li> <li>Materiały podstawowe i rozszerzone w cenie kursu</li> <li>Możliwość konsultacji między zajęciami</li> <li>Dostęp do prywatnej grupy szkolnej</li></ul>";
          choosenCourseinformationInput.value = "KURS GRUPOWY AMBITNY PLUS";
          choosenWayinformationInput.value =
            "Wole pracować w kameralnej grupie";
          break;
        case "samodzielnie-w-domu":
          formTitle.textContent = "KURS AMBITNY WYKŁADOWY";
          formWorkTime.textContent = "120 minut / tydzień";
          formDescription.innerHTML =
            "<ul><li>Praca domowa po każdych zajęciach</li> <li>Dodatkowe prace domowe dla chętnych</li> <li>Materiały podstawowe i rozszerzone w cenie kursu</li> <li>Możliwość konsultacji między zajęciami</li> <li>Dostęp do prywatnej grupy szkolnej</li></ul>";
          choosenCourseinformationInput.value = "KURS AMBITNY WYKŁADOWY";
          choosenWayinformationInput.value = option.querySelector(
            ".course-description"
          ).textContent;
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

    formHandler();
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
        currentStageDescriptionHandler(option);
        options.forEach((option) => option.classList.remove("move-out"));
        counter++;
        currentStage.textContent = counter;

        setTimeout(() => {
          coursesPage.scrollIntoView({ behavior: "smooth" });
        }, 400);
      }, 500);
    }, 500);
  });
});

additionalInformationHandler.forEach((handler) => {
  handler.addEventListener("click", () => {
    handler.nextElementSibling.classList.toggle("active");
  });
});
