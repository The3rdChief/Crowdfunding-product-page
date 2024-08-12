// Tailwind config
tailwind.config = {
  theme: {
    extend: {
      colors: {
        // Primary
        mod_cyan: "hsl(176, 50%, 47%)",
        dark_cyan: "hsl(176, 72%, 28%)",
        // Neutral
        black: "hsl(0, 0%, 0%)",
        dark_gray: "hsl(0, 0%, 48%)",
      },
      fontFamily: {
        sans: "commissioner",
      },
      fontSize: {
        base: "1rem",
      },
      screens: {
        small: "400px",
        grid_break: "550px",
        mid: "700px",
      },
    },
  },
};

// global function to set attribute
function setAttr(elem, attr, value) {
  elem.setAttribute(attr, value);
}

// Menu functionalities
// DOM

const menuBtn = document.querySelector("#menu-btn");
const menuStateImg = menuBtn.querySelector("img");
const navUl = document.querySelector("nav ul");
const headerOverlay = document.getElementById("overlay");

menuBtn.addEventListener("click", () => {
  let stateImg = menuStateImg.id;

  if (stateImg == "open-menu") {
    setAttr(menuStateImg, "src", "./images/icon-close-menu.svg");
    setAttr(menuStateImg, "id", "close-menu");
    // menu
    navUl.setAttribute("data-state", "open");
    // overlay
    headerOverlay.style.visibility = "visible";
    headerOverlay.style.opacity = "1";
    // body scroll
    document.body.style.overflowY = "hidden";
  } else {
    menuStateImg.setAttribute("src", "./images/icon-hamburger.svg");
    menuStateImg.setAttribute("id", "open-menu");
    // menu
    navUl.setAttribute("data-state", "closed");
    // overlay
    headerOverlay.style.visibility = "hidden";
    headerOverlay.style.opacity = "0";
    // body scroll
    document.body.style.overflowY = "auto";
  }
});

// more nav functions
const anchors = navUl.querySelectorAll("a");

anchors.forEach((anchor) => {
  anchor.addEventListener("click", () => {
    document.body.style.overflowY = "auto";
    setAttr(navUl, "data-state", "closed");
    headerOverlay.style.visibility = "hidden";
    headerOverlay.style.opacity = "0";
    menuStateImg.setAttribute("src", "./images/icon-hamburger.svg");
    menuStateImg.setAttribute("id", "open-menu");
  });
});

// Bookmark function
// DOM
const bookmarkBtn = document.getElementById("bookmark-btn");

bookmarkBtn.addEventListener("click", () => {
  let state = bookmarkBtn.querySelector("span:nth-child(2)");
  if (bookmarkBtn.dataset.bookmark == "no") {
    setAttr(bookmarkBtn, "data-bookmark", "yes");
    state.textContent = "Bookmarked";
  } else {
    setAttr(bookmarkBtn, "data-bookmark", "no");
    state.textContent = "Bookmark";
  }
});

// Modal functionalities
// DOM
const backThisProjectBtn = document.querySelector("#back-this-btn");
const selectionModal = document.querySelector("[data-selection-modal]");
const closeSelectionModalBtn = document.getElementById("close-selection-modal");
const blocks = document.getElementById("blocks");

backThisProjectBtn.addEventListener("click", () => {
  selectionModal.showModal();
});

closeSelectionModalBtn.addEventListener("click", () => {
  selectionModal.close();
});

// display pledge options on selection modal
// DOM
const blocksSection = document.getElementById("blocks");

// Pledge items array
const pledgesArray = [
  {
    title: "Pledge with no reward",
    pledgeLimit: "",
    infoP:
      "Choose to support us without a reward if you simply believe in our project. As a backer, you will be signed up to receive product updates via email.",
    remaining: "",
    left: "",
    minValue: 1,
    avail: "yes",
  },
  {
    title: "Bamboo Stand",
    pledgeLimit: "Pledge $25 or more",
    infoP:
      "You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you'll be added to a special Backer member list.",
    remaining: 101,
    left: "left",
    minValue: 25,
    avail: "yes",
  },
  {
    title: "Black Edition Stand",
    pledgeLimit: "Pledge $75 or more",
    infoP:
      "You get a Black Special Edition computer stand and a personal thank you. You'll be added to our Backer member list. Shipping is included.",
    remaining: 64,
    left: "left",
    minValue: 75,
    avail: "yes",
  },
  {
    title: "Mahogany Special Edition",
    pledgeLimit: "Pledge $200 or more",
    infoP:
      "You get two Special Edition Mahogany stands, a Backer T-Shirt, and a personal thank you. You'll be added to our Backer member list. Shipping is included.",
    remaining: 0,
    left: "left",
    minValue: 200,
    avail: "no",
  },
];

function displayPledges(pledges) {
  let displayList = pledges.map(function (pledge) {
    return `
      <section tabindex="0" class="focus:outline-none" data-clicked="no" data-available="${pledge.avail}">
            <div data-clicker class="group p-6 gap-3 flex cursor-pointer">
              <div
                data-checker
                class="size-8 min-w-8 rounded-full border group-hover:border-mod_cyan group-focus:border-mod_cyan relative transition-colors duration-200 after:absolute after:bg-mod_cyan after:content-[''] after:rounded-full after:inset-0 after:scale-0 after:transition-transform after:duration-200"
              ></div>
              <div class="flex flex-wrap gap-x-3 gap-y-4 justify-between">
                <!-- header -->
                <div
                  class="flex flex-col gap-1 mid:flex-row mid:gap-6 mid:items-center order-1"
                >
                  <h4
                    class="text-[1.075rem] transition-colors duration-200 font-semibold text-black group-hover:text-mod_cyan group-focus:text-mod_cyan"
                  >
                  ${pledge.title}
                  </h4>
                  <!-- pledge limit -->
                  <span class="text-mod_cyan text-base"
                    >${pledge.pledgeLimit}</span
                  >
                </div>
                <!-- end of header -->
                <p class="w-full order-2 mid:order-3">
                ${pledge.infoP}
                </p>

                <!-- remaining -->
                <div
                  id="remaining"
                  class="flex gap-1.5 items-center order-3 mid:order-2"
                >
                  <span id="bamboo" class="text-2xl font-semibold text-black"
                    >${pledge.remaining}</span
                  >
                  <span class="text-sm">${pledge.left}</span>
                </div>
              </div>
            </div>
            <div data-checkout class="px-6">
              <!-- content -->
              <div
                class="flex items-center text-center gap-4 min-[520px]:justify-between justify-center flex-wrap"
              >
                <div>Enter your pledge</div>
                <!-- input -->
                <div class="flex items-center gap-2">
                  <!-- input wrapper -->
                  <div class="relative isolate w-[8ch] h-11">
                    <input
                      type="number"
                      name="bamboo"
                      minlength = "2" 
                      min="${pledge.minValue}"
                      value="${pledge.minValue}"
                      class="z-[-1] absolute inset-0 border max-w-[8ch] border-mod_cyan rounded-full pl-8 px-4 py-2 text-black font-semibold focus:outline-none"
                    />
                    <span class="absolute top-1/2 -translate-y-1/2 left-4 z-10"
                      >$</span
                    >
                  </div>
                  <!-- end of input wrapper -->
                  <!-- button -->
                  <button
                    data-continue-button
                    class="px-8 rounded-full py-3 text-white bg-mod_cyan transition-colors duration-200 hover:bg-dark_cyan min-w-max max-w-max"
                  >
                    Continue
                  </button>
                  <!-- end of button -->
                </div>
                <!-- end of input -->
              </div>
            </div>
          </section>
    `;
  });

  displayList = displayList.join("");

  blocksSection.innerHTML = displayList;
}

// set default values to display

const totalRaised = 69914,
  total = 100000,
  backers = 3007;

// function to add commas toString
function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}

// run code on page load
window.addEventListener("DOMContentLoaded", () => {
  displayPledges(pledgesArray);
  // make block options clickable
  const pledgeBlocks = blocks.querySelectorAll("section");

  pledgeBlocks.forEach((pledgeBlock) => {
    pledgeBlock
      .querySelector("[data-clicker]")
      .addEventListener("click", (e) => {
        const prevClicked = blocks.querySelector("[data-clicked='yes']");

        if (prevClicked == null) {
          console.log("no previously clicked");
        } else {
          prevClicked.setAttribute("data-clicked", "no");
        }

        // toggle state
        if (e.currentTarget.parentElement.dataset.clicked == "no") {
          e.currentTarget.parentElement.setAttribute("data-clicked", "yes");
        } else {
          e.currentTarget.parentElement.setAttribute("data-clicked", "no");
        }
      });
  });

  // update stats
  // DOM
  const totalBacked = document.getElementById("total-backed");
  const totalBackers = document.getElementById("total-backers");
  const progressBar = document.getElementById("progess-bar");

  // continue buttons
  // open success modal
  // DOM
  const continueBtns = document.querySelectorAll("[data-continue-button]");
  const completeModal = document.querySelector("[data-success-modal]");
  // function
  continueBtns.forEach((contBtn) => {
    contBtn.addEventListener("click", () => {
      const input = contBtn.previousElementSibling.querySelector("input");

      input.addEventListener("input", () => {
        if (input.checkValidity()) {
          input.style.borderColor = "hsl(176, 50%, 47%)";
        } else {
          input.style.borderColor = "red";
        }
      });
      // run complete function
      if (input.checkValidity()) {
        // display raised
        let displayRaised = Number(totalRaised + Number(input.value));
        let raisedValue = displayRaised;
        displayRaised = numberWithCommas(displayRaised);
        totalBacked.textContent = `$${displayRaised}`;
        // display backers
        let displayBackers = backers + 1;
        displayBackers = numberWithCommas(displayBackers);
        totalBackers.textContent = displayBackers;
        // display progress
        let progressWidth = Math.floor((raisedValue / total) * 100);
        progressBar.style.width = `${progressWidth.toString()}%`;
        // open complete modal
        completeModal.showModal();
      } else {
        input.style.borderColor = "red";
      }
    });
  });

  const gotItBtn = document.getElementById("got-it");

  gotItBtn.addEventListener("click", () => {
    completeModal.close();
    selectionModal.close();
  });
});
