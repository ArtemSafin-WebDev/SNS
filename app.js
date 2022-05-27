document.addEventListener("DOMContentLoaded", () => {
  const onlyNumericInputsNoFormatting = Array.from(
    document.querySelectorAll(".js-numeric-input")
  );

  onlyNumericInputsNoFormatting.forEach((input) => {
    input.addEventListener("input", () => {
      const value = input.value;
      const newCleanedValue = parseInt(value.replace(/[^\d]+/g, ""), 10);
      if (isNaN(newCleanedValue)) {
        input.value = "";
      } else {
        input.value = newCleanedValue;
      }
    });
  });

  const phoneInputs = Array.from(document.querySelectorAll(".js-phone-input"));

  phoneInputs.forEach((input) => {
    const instance = new Inputmask({ mask: "+7 (999) 999-99-99" });
    instance.mask(input);
  });

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
          input.classList.add('loaded');
          if (label) {
            label.textContent = input.files[0].name;
          }
        
        } else {
          input.classList.remove('loaded');
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
});
