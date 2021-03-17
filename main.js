const groupedInput = document.getElementById("grouped");
let maxLength = 16;
let groupSize = 4;
//govt version
class i {
    constructor(t) {
        this.input = t;
        var n = parseInt(t.getAttribute("data-group-size"), 10);
        (this.groupingRegex = new RegExp(".{1,".concat(n, "}"), "g")),
            this.bindEventListeners();
    }
    bindEventListeners() {
        this.input.addEventListener("input", this.handleInput.bind(this));
    }
    handleInput() {
        var t = this.input.selectionStart,
            n = t !== this.input.value.length;
        (this.input.value = (
            this.input.value.replace(/\s/g, "").match(this.groupingRegex) || []
        ).join(" ")),
            n && this.input.setSelectionRange(t, t);
    }
}
// const test = new i(groupedInput)

// simplified
groupedInput.addEventListener("input", handleInput);
function handleInput() {
    const cursor = this.selectionStart;
    const oldLength = this.value.length;
    const groupingRegex = new RegExp(".{1,".concat(groupSize, "}"), "g");
    this.value = (
        this.value.replace(/\s/g, "").match(groupingRegex) || []
    ).join(" ");
    if (cursor !== oldLength) this.setSelectionRange(cursor, cursor);
}

const dummyEvent = new Event("input");

const inputs = document.querySelectorAll(".input--in--text");
function resizeInput(input) {
    input.addEventListener("input", function (e) {
        this.style.width =
            Math.max(this.value.length, this.placeholder.length) + 1 + "ch";
    });
}
function filterNonNums(input) {
    input.addEventListener("input", function (e) {
        this.value = this.value.replace(/\D/g, "");
    });
}
inputs.forEach((input) => {
    filterNonNums(input);
    resizeInput(input);
    input.dispatchEvent(dummyEvent);
});

const maxLengthInput = document.getElementById("length");
const groupSizeInput = document.getElementById("group-size");

groupSizeInput.addEventListener("input", function (e) {
    const oldGroupSize = groupSize;
    groupSize = parseInt(this.value) || oldGroupSize;
    if (groupSize !== oldGroupSize) {
        groupedInput.dispatchEvent(dummyEvent);
        updateMaxLength();
    }
});

maxLengthInput.addEventListener("input", function (e) {
    const oldMaxLength = maxLength;
    maxLength = parseInt(this.value) || oldMaxLength;
    if (maxLength !== oldMaxLength) updateMaxLength();
});

function updateMaxLength() {
    groupedInput.maxLength =
        maxLength + Math.floor((maxLength - 1) / groupSize);
    groupedInput.style.width =
        1.23 * maxLength +
        1.3 * Math.floor((maxLength - 1) / groupSize) +
        0.2 +
        "ch";
    groupedInput.value = groupedInput.value.slice(
        0,
        maxLength + Math.floor((maxLength - 1) / groupSize),
    );
}

updateMaxLength();
