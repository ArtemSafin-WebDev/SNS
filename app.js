document.addEventListener("DOMContentLoaded", () => {
  const initializeMasks = () => {
    const onlyNumericInputsNoFormatting = Array.from(
      document.querySelectorAll(".js-numeric-input")
    );

    onlyNumericInputsNoFormatting.forEach((input) => {
      if (input.classList.contains("mask-initialized")) return;
      input.addEventListener("input", () => {
        const value = input.value;
        const newCleanedValue = parseInt(value.replace(/[^\d]+/g, ""), 10);
        if (isNaN(newCleanedValue)) {
          input.value = "";
        } else {
          input.value = newCleanedValue;
        }
      });

      input.classList.add("mask-initialized");
    });

    const phoneInputs = Array.from(
      document.querySelectorAll(".js-phone-input")
    );

    phoneInputs.forEach((input) => {
      if (input.classList.contains("mask-initialized")) return;
      const instance = new Inputmask({ mask: "+7 (999) 999-99-99" });
      instance.mask(input);

      input.classList.add("mask-initialized");
    });
  };

  initializeMasks();

  const setWidth = () => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.documentElement.style.setProperty(
      "--sb-width",
      scrollbarWidth + "px"
    );
  };

  setWidth();

  window.addEventListener("resize", setWidth);

  const setContainerWidth = () => {
    const container = document.querySelector(
      ".become-partner__inner-container"
    );
    if (!container) return;

    document.documentElement.style.setProperty(
      "--partner-container-width",
      container.offsetWidth + "px"
    );
  };

  setContainerWidth();

  window.addEventListener("resize", setContainerWidth);

  function fileUploads() {
    const elements = Array.from(document.querySelectorAll(".js-file-upload"));

    elements.forEach((element) => {
      const input = element.querySelector('input[type="file"]');
      const label = element.querySelector(".js-file-upload-text");
      const form = element.closest("form");

      input.addEventListener("change", () => {
        if (input.files.length) {
          input.classList.add("loaded");
          if (label) {
            label.textContent = input.files[0].name;
          }
        } else {
          input.classList.remove("loaded");
        }
      });

      input.addEventListener("dragenter", () => {
        element.classList.add("dragged");
      });
      input.addEventListener("dragend", () => {
        element.classList.remove("dragged");
      });
      input.addEventListener("dragleave", () => {
        element.classList.remove("dragged");
      });
      input.addEventListener("drop", () => {
        element.classList.remove("dragged");
      });

      if (form) {
        form.addEventListener("reset", () => {
          input.value = "";
          label.innerHTML = originalLabelText;
          element.classList.remove("file-loaded");
          element.classList.remove("dragged");
        });
      }
    });
  }

  fileUploads();

  const allCheckboxes = Array.from(
    document.querySelectorAll('input[type="radio"], input[type="checkbox"]')
  );

  const elementToggles = allCheckboxes.filter((element) =>
    element.hasAttribute("data-show-element")
  );

  allCheckboxes.forEach((box) => {
    const check = () => {
      elementToggles.forEach((toggle) => {
        const element = document.querySelector(
          toggle.getAttribute("data-show-element")
        );
        if (!element) {
          console.error("No element");
          return;
        }

        if (toggle.checked) {
          console.log("Box checked");

          element.classList.add("shown");
        } else {
          console.log("Box not checked");

          element.classList.remove("shown");
        }
      });
    };

    check();
    box.addEventListener("change", () => {
      check();
    });

    // const element = document.querySelector(box.getAttribute('data-show-element'));
    // if (!element) {
    //   console.error('No element');
    //   return;
    // }

    // const check = () => {
    //   if (box.checked) {
    //     console.log('Box checked');
    //   } else {
    //     console.log('Box not checked');
    //   }
    // }
    // box.addEventListener('change', () => {
    //   check();
    // });

    // check();
  });

  const copyInputBtns = Array.from(document.querySelectorAll(".js-copy-input"));

  console.log("Copy inputs", copyInputBtns);

  copyInputBtns.forEach((btn) => {
    if (!btn.hasAttribute("data-copy")) return;

    const fieldsToCopy = Array.from(document.querySelectorAll(btn.getAttribute("data-copy")));

    if (!fieldsToCopy.length) {
      console.error("No fields to copy");
      return;
    }

    btn.addEventListener("click", (event) => {
      event.preventDefault();
      console.log("Copying field");

      const fieldClones = fieldsToCopy.map(field => {
        const fieldClone = field.cloneNode(true);
        fieldClone.value = "";
        fieldClone.classList.remove("mask-initialized");
        return fieldClone;
      });

      const allFields = document.querySelectorAll(btn.getAttribute("data-copy"));

      console.log("field clones", fieldClones);
      allFields[allFields.length - 1].after(...fieldClones);

      initializeMasks();

    });
  });
});
