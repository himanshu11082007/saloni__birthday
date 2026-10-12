/* =====================================================
   PERSONAL INFORMATION
===================================================== */

const friendName = "Saloni";

const birthdayDate = "2026-09-03";


/* =====================================================
   MAIN SCENES
===================================================== */

const scenes = [
    "scene-opening",
    "scene-birthday",
    "scene-distance",
    "scene-flowers",
    "scene-food",
    "scene-teddy",
    "scene-photos",
    "scene-future",
    "scene-letter",
    "scene-gift"
];


let currentScene = 0;


/* =====================================================
   ELEMENTS
===================================================== */

const music =
    document.getElementById("birthdayMusic");

const progressNumber =
    document.getElementById("progressNumber");


/* =====================================================
   SCENE NAVIGATION
===================================================== */

function goToScene(sceneId) {

    const oldScene =
        document.querySelector(
            ".scene.active"
        );

    const newScene =
        document.getElementById(sceneId);


    if (!newScene || oldScene === newScene) {
        return;
    }


    oldScene.classList.remove("active");

    newScene.classList.add("active");


    currentScene =
        scenes.indexOf(sceneId);


    updateProgress();


    /* Scroll new scene to top */

    newScene.scrollTop = 0;

}


/* =====================================================
   PROGRESS
===================================================== */

function updateProgress() {

    const number =
        String(currentScene + 1)
            .padStart(2, "0");


    progressNumber.textContent =
        number;

}


/* =====================================================
   BEGIN BUTTON
===================================================== */

const beginButton =
    document.getElementById("beginButton");


beginButton.addEventListener(
    "click",
    () => {

        /*
         Music starts only after
         the user interacts.
        */

        if (music) {

            music.volume = 0.35;

            music.play().catch(() => {
                console.log(
                    "Music playback requires user interaction."
                );
            });

        }


        goToScene("scene-birthday");

        createConfetti();

    }
);


/* =====================================================
   NEXT BUTTONS
===================================================== */

const nextButtons =
    document.querySelectorAll(
        ".next-button[data-next]"
    );


nextButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const nextScene =
                    button.dataset.next;

                goToScene(nextScene);

            }
        );

    }
);


/* =====================================================
   CLEAR TAP GUIDANCE
   Every important action gets a visible animated
   label above the button so the visitor always
   knows where to tap next.
===================================================== */

function addTapGuidance(selector, hint) {

    document.querySelectorAll(selector).forEach(button => {

        button.classList.add("guided-button");
        button.dataset.hint = hint;

    });
}

addTapGuidance(
    ".next-button[data-next]",
    "👆 TAP HERE TO CONTINUE"
);

addTapGuidance(
    "#flowersContinue, #foodContinue, #letterContinue",
    "👆 TAP HERE TO CONTINUE"
);

addTapGuidance(
    "#beginButton",
    "👆 TAP HERE TO START"
);

addTapGuidance(
    "#nextPhotoButton",
    "👆 TAP FOR NEXT PHOTO"
);

addTapGuidance(
    "#openLetterButton",
    "👆 TAP TO OPEN"
);

addTapGuidance(
    "#openGiftButton",
    "👆 TAP TO OPEN GIFT"
);


/* =====================================================
   BIRTHDAY CONFETTI
===================================================== */

function createConfetti() {

    const symbols = [
        "🌸",
        "✨",
        "💕",
        "🌷",
        "🎉",
        "💗"
    ];


    const container =
        document.getElementById(
            "birthdayConfetti"
        );


    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const piece =
            document.createElement(
                "div"
            );


        piece.className =
            "confetti";


        piece.textContent =
            symbols[
                Math.floor(
                    Math.random()
                    * symbols.length
                )
            ];


        piece.style.left =
            Math.random() * 100 + "vw";


        piece.style.fontSize =
            (12 +
                Math.random() * 14)
            + "px";


        piece.style.animationDelay =
            Math.random() * 1.5
            + "s";


        container.appendChild(piece);


        setTimeout(
            () => {
                piece.remove();
            },
            4500
        );

    }

}


/* =====================================================
   SCENE 3 — PUNE → NAGPUR
===================================================== */

const travellingLetter =
    document.getElementById(
        "travellingLetter"
    );


const distanceMessage =
    document.getElementById(
        "distanceMessage"
    );


const letterStatus =
    document.getElementById(
        "letterStatus"
    );


const distanceResult =
    document.querySelector(
        ".distance-result"
    );


const distanceScene =
    document.getElementById(
        "scene-distance"
    );


let letterJourneyStarted = false;


/* =====================================================
   START LETTER JOURNEY
===================================================== */

function startLetterJourney() {

    if (letterJourneyStarted) {
        return;
    }

    letterJourneyStarted = true;


    /*
       Small pause before
       the letter starts moving.
    */

    setTimeout(() => {

        travellingLetter.classList.add(
            "traveling"
        );


        letterStatus.textContent =
            "💌 A little birthday wish is travelling to Nagpur...";


    }, 1200);


    /*
       Letter reaches Nagpur
       after 6 seconds.
    */

    setTimeout(() => {

        letterStatus.textContent =
            "💌 Delivered to Nagpur. ❤️";


        letterStatus.classList.add(
            "delivered"
        );


        distanceMessage.innerHTML = `

            <p>
                You're in Nagpur.
            </p>

            <p>
                I'm in Pune.
            </p>

            <p>
                But somehow,
                this little wish made the journey. 🌸
            </p>

        `;


    }, 7500);


    /*
       Show Continue after
       she has had a moment
       to see the message.
    */

    setTimeout(() => {

        distanceResult.classList.remove(
            "hidden"
        );

    }, 9000);

}


/* =====================================================
   START WHEN SCENE OPENS
===================================================== */

const distanceObserver =
    new MutationObserver(() => {

        if (
            distanceScene.classList.contains(
                "active"
            )
        ) {

            startLetterJourney();

        }

    });


distanceObserver.observe(
    distanceScene,
    {
        attributes: true,
        attributeFilter: ["class"]
    }
);

/* =====================================================
   SCENE 4 — FLOWERS
===================================================== */

const garden =
    document.getElementById(
        "garden"
    );


const flowerCount =
    document.getElementById(
        "flowerCount"
    );


const flowerMessage =
    document.getElementById(
        "flowerMessage"
    );


const flowersContinue =
    document.getElementById(
        "flowersContinue"
    );


const flowerTypes = [
    "🌷",
    "🌸",
    "🌼",
    "🌺",
    "🌹",
    "💐"
];


let flowersGrown = 0;

let gardenStarted = false;


/* =====================================================
   START GARDEN AUTOMATICALLY
===================================================== */

function startGarden() {

    if (gardenStarted) {
        return;
    }

    gardenStarted = true;

    flowersGrown = 0;

    flowerCount.textContent =
        "Watch closely... 🌱";

    flowerMessage.textContent =
        "Something is about to grow...";


    growNextFlower();

}


/* =====================================================
   GROW ONE FLOWER
===================================================== */

function growNextFlower() {

    if (flowersGrown >= 6) {

        gardenFinished();

        return;
    }


    /*
       Small message before
       each flower appears.
    */

    const messages = [

        "A little beauty is growing... 🌱",

        "One flower for a little happiness. 🌸",

        "Another one... because one isn't enough. 🌷",

        "The garden is getting prettier. 🌼",

        "Almost there... 🌺",

        "And one last flower for you. 🌹"

    ];


    flowerMessage.textContent =
        messages[flowersGrown];


    /*
       Wait before growing
       the next flower.
    */

    setTimeout(() => {

        const flower =
            document.createElement(
                "div"
            );


        flower.className =
            "grown-flower";


        flower.textContent =
            flowerTypes[
                flowersGrown
            ];


        /*
           Different position
           for every flower.
        */

        const positions = [
            12,
            28,
            43,
            57,
            72,
            87
        ];


        flower.style.left =
            positions[flowersGrown] + "%";


        /*
           Slightly different
           sizes.
        */

        const sizes = [
            38,
            45,
            35,
            42,
            39,
            48
        ];


        flower.style.fontSize =
            sizes[flowersGrown] + "px";


        garden.appendChild(
            flower
        );


        flowersGrown++;


        flowerCount.textContent =
            `${flowersGrown} / 6 flowers`;


        /*
           Grow the next flower
           after a short pause.
        */

        setTimeout(
            growNextFlower,
            1200
        );


    }, 900);

}


/* =====================================================
   GARDEN FINISHED
===================================================== */

function gardenFinished() {

    flowerCount.textContent =
        "Your little garden is ready. 🌸";


    flowerMessage.textContent =
        "A little garden, just for you. ❤️";


    /*
       Wait a little before
       showing the button.
    */

    setTimeout(() => {

        flowersContinue.classList.remove(
            "hidden"
        );

    }, 1200);

}


/* =====================================================
   START WHEN FLOWER SCENE OPENS
===================================================== */

const flowerScene =
    document.getElementById(
        "scene-flowers"
    );


/*
   MutationObserver detects
   when the scene becomes active.
*/

const flowerObserver =
    new MutationObserver(() => {

        if (
            flowerScene.classList.contains(
                "active"
            )
        ) {

            startGarden();

        }

    });


flowerObserver.observe(
    flowerScene,
    {
        attributes: true,
        attributeFilter: ["class"]
    }
);


/* =====================================================
   CONTINUE
===================================================== */

flowersContinue.addEventListener(
    "click",
    () => {

        goToScene(
            "scene-food"
        );

    }
);

/* =====================================================
   SCENE 5 — FOOD
===================================================== */

const foodOptions =
    document.querySelectorAll(
        ".food-option"
    );


const selectedFood =
    document.getElementById(
        "selectedFood"
    );


const foodText =
    document.getElementById(
        "foodText"
    );


const foodContinue =
    document.getElementById(
        "foodContinue"
    );


const foodMessages = {

    "🍕":
        "A very important birthday decision. 😂",

    "🍯":
        "Okay, we both know this was always going to be your choice. 😌❤️",

    "🍫":
        "A little chocolate makes every birthday better. 🍫",

    "🍓":
        "Something fresh for a fresh new year of your life. 🌸"

};


foodOptions.forEach(
    option => {

        option.addEventListener(
            "click",
            () => {

                foodOptions.forEach(
                    item => {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


                option.classList.add(
                    "selected"
                );


                const food =
                    option.dataset.food;


                selectedFood.textContent =
                    food;


                foodText.textContent =
                    foodMessages[food];


                foodContinue.classList.remove(
                    "hidden"
                );

            }
        );

    }
);


/* =====================================================
   FOOD → PHOTOS
===================================================== */

foodContinue.addEventListener(
    "click",
    () => {

        goToScene("scene-photos");

    }
);

/* =====================================================
   SCENE 6 — PHOTOS
===================================================== */

const photos = [
    {
        image: "images/photo1.jpg",
        caption: "Just you being you. 🌸"
    },

    {
        image: "images/photo2.jpg",
        caption: "Another picture worth keeping. ✨"
    },

    {
        image: "images/photo3.jpg",
        caption: "And one more for today. ❤️"
    }
];


let currentPhoto = 0;


const memoryPhoto =
    document.getElementById(
        "memoryPhoto"
    );


const photoNumber =
    document.getElementById(
        "photoNumber"
    );


const photoCaption =
    document.getElementById(
        "photoCaption"
    );


const nextPhotoButton =
    document.getElementById(
        "nextPhotoButton"
    );


const photoDots =
    document.querySelectorAll(
        ".photo-dot"
    );


nextPhotoButton.addEventListener(
    "click",
    () => {

        currentPhoto++;


        if (
            currentPhoto >=
            photos.length
        ) {

            goToScene(
                "scene-future"
            );

            return;

        }


        changePhoto(
            currentPhoto
        );

    }
);


function changePhoto(index) {

    memoryPhoto.style.opacity =
        "0";


    setTimeout(
        () => {

            memoryPhoto.src =
                photos[index].image;


            photoCaption.textContent =
                photos[index].caption;


            photoNumber.textContent =
                String(index + 1)
                    .padStart(2, "0");


            photoDots.forEach(
                (dot, i) => {

                    dot.classList.toggle(
                        "active",
                        i === index
                    );

                }
            );


            memoryPhoto.style.opacity =
                "1";

        },
        250
    );

}


/* =====================================================
   SCENE 8 — PERSONAL LETTER
===================================================== */

const openLetterButton =
    document.getElementById(
        "openLetterButton"
    );


const envelopeContainer =
    document.getElementById(
        "envelopeContainer"
    );


const personalLetter =
    document.getElementById(
        "personalLetter"
    );


const letterContinue =
    document.getElementById(
        "letterContinue"
    );


openLetterButton.addEventListener(
    "click",
    () => {

        openLetterButton.classList.add(
            "hidden"
        );


        envelopeContainer.classList.add(
            "open"
        );


        setTimeout(
            () => {

                personalLetter.classList.remove(
                    "hidden"
                );

                letterContinue.classList.remove(
                    "hidden"
                );

                personalLetter.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            },
            850
        );

    }
);


letterContinue.addEventListener(
    "click",
    () => {

        goToScene(
            "scene-gift"
        );

    }
);


/* =====================================================
   SCENE 10 — GIFTS ONE BY ONE
===================================================== */

const openGiftButton =
    document.getElementById("openGiftButton");

/* Keep the gift button guidance in sync as its text changes. */
openGiftButton.classList.add("guided-button");
openGiftButton.dataset.hint = "👆 TAP TO OPEN GIFT";

const giftMessage =
    document.getElementById("giftMessage");

const giftTitle =
    document.getElementById("giftTitle");

const giftTeddy =
    document.getElementById("giftTeddy");

const singleGiftCard =
    document.getElementById("singleGiftCard");

const giftNumber =
    document.getElementById("giftNumber");

const singleGiftIcon =
    document.getElementById("singleGiftIcon");

const singleGiftTitle =
    document.getElementById("singleGiftTitle");

const singleGiftText =
    document.getElementById("singleGiftText");

const birthdayFinale =
    document.getElementById("birthdayFinale");

const giftSteps =
    document.querySelectorAll(".gift-step");

let currentGift = 0;

const gifts = [
    {
        number: "GIFT 1",
        icon: "🍫",
        title: "Something sweet",
        text: "A little chocolate for someone who makes life sweeter. 🍫❤️",
        teddy: "🧸🍫"
    },
    {
        number: "GIFT 2",
        icon: "🧸",
        title: "Someone to hug",
        text: "A little teddy, because sometimes a hug is the best gift. 🥰",
        teddy: "🧸💕"
    },
    {
        number: "GIFT 3",
        icon: "💐",
        title: "Something beautiful",
        text: "Flowers for you, because you deserve something beautiful. 🌸",
        teddy: "🧸💐"
    }
];

openGiftButton.addEventListener("click", () => {

    if (currentGift >= gifts.length) {
        finishGifts();
        return;
    }

    const gift = gifts[currentGift];

    singleGiftCard.classList.remove("gift-card-pop");
    void singleGiftCard.offsetWidth;
    singleGiftCard.classList.add("gift-card-pop");

    giftNumber.textContent = gift.number;
    singleGiftIcon.textContent = gift.icon;
    singleGiftTitle.textContent = gift.title;
    singleGiftText.textContent = gift.text;
    giftTeddy.textContent = gift.teddy;

    giftMessage.textContent =
        currentGift === 0
            ? "Let's start with something sweet... 🍫"
            : currentGift === 1
                ? "One more... this one can give you a hug. 🧸"
                : "And finally... something beautiful. 💐";

    giftSteps.forEach((step, index) => {
        step.classList.toggle(
            "active",
            index === currentGift
        );
        step.classList.toggle(
            "done",
            index < currentGift
        );
    });

    currentGift++;

    if (currentGift < gifts.length) {
        openGiftButton.innerHTML =
            `Next Gift ${currentGift + 1} <span>→</span>`;
        openGiftButton.dataset.hint =
            "👆 TAP FOR NEXT GIFT";
    } else {
        openGiftButton.innerHTML =
            "Finish the surprise ❤️ <span>→</span>";
        openGiftButton.dataset.hint =
            "👆 TAP TO FINISH";
    }

});

function finishGifts() {
    openGiftButton.classList.add("hidden");
    document.querySelector(".gift-button-wrap").classList.add("hidden");
    singleGiftCard.classList.add("hidden");
    document.getElementById("giftProgress").classList.add("hidden");

    giftTitle.innerHTML = `
        And now...
        <br>
        <span>everything is yours.</span>
    `;

    giftMessage.innerHTML =
        "Happy Birthday, Saloni. ❤️";

    giftTeddy.textContent = "🧸🥰";

    birthdayFinale.classList.remove("hidden");
    createBirthdayCelebration();
}

function createBirthdayCelebration() {
    const items = [
        "❤️",
        "🌸",
        "✨",
        "💕",
        "🌷",
        "🎀"
    ];

    for (let i = 0; i < 30; i++) {
        const item = document.createElement("div");
        item.className = "celebration-heart";
        item.textContent =
            items[Math.floor(Math.random() * items.length)];
        item.style.left = Math.random() * 100 + "%";
        item.style.animationDelay = Math.random() * 2 + "s";
        document.body.appendChild(item);

        setTimeout(() => item.remove(), 5000);
    }
}

/* =====================================================
   INITIALIZATION
===================================================== */

updateProgress();
