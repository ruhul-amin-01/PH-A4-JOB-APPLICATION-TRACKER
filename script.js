//global Variables
let currentTab = "all";
const Tabs = ["all", "interview", "reject"];
const btnAll = document.getElementById("btn-all");
const btnInterview = document.getElementById("btn-interview");
const btnReject = document.getElementById("btn-reject");
const activeBtn = ["bg-blue-700", "text-white", "active-btn"];
const inActiveBtn = ["text-gray-950", "bg-[#ebeff1b2]", "inactive-btn"];
const totalCount = document.getElementById("total-count");
const interviewCount = document.getElementById("interview-count");
const rejectedCount = document.getElementById("rejected-count");
const allActiveJobs = document.getElementsByClassName("active-card");
const allInterviewJobs = document.getElementsByClassName("interview-card");
const allRejectedJobs = document.getElementsByClassName("rejected-card");
const availableTotal = document.getElementById("available-total");
const noJob = document.getElementById("no-job");

// by default
btnAll.classList.add(...activeBtn);
// global functions
// update records
function updateRecords() {
    totalCount.innerText = document.querySelectorAll(".active-card").length;
    interviewCount.innerText = document.querySelectorAll(".interview-card").length;
    rejectedCount.innerText = document.querySelectorAll(".rejected-card").length;
}
updateRecords();
// update total available jobs
function updateAvailableTotal() {
    if (btnAll.classList.contains(...activeBtn)) {
        availableTotal.innerText = allActiveJobs.length;
    }
    if (btnInterview.classList.contains(...activeBtn)) {
        availableTotal.innerText = allInterviewJobs.length;
    }
    if (btnReject.classList.contains(...activeBtn)) {
        availableTotal.innerText = allRejectedJobs.length;
    }
    if (availableTotal.innerText <= 1) {
        document.getElementById("sss").classList.add("hidden");
    } else {
        document.getElementById("sss").classList.remove("hidden");
    }
}
updateAvailableTotal();
// when any toggle button get a click
document.getElementById("toggle-btn-section").addEventListener("click", function (event) {
    const target = event.target;
    if (target == btnAll || target == btnInterview || target == btnReject) {
        // at first every button become inactive
        btnAll.classList.add(...inActiveBtn);
        btnInterview.classList.add(...inActiveBtn);
        btnReject.classList.add(...inActiveBtn);
        btnAll.classList.remove(...activeBtn);
        btnInterview.classList.remove(...activeBtn);
        btnReject.classList.remove(...activeBtn);
    }
    // when tgl-btn-all get a click
    if (target == btnAll) {
        // target button become active
        btnAll.classList.remove(...inActiveBtn);
        btnAll.classList.add(...activeBtn);
    }
    // when tgl-btn-interview get a click
    if (target == btnInterview) {
        // target button become active
        btnInterview.classList.remove(...inActiveBtn);
        btnInterview.classList.add(...activeBtn);
    }
    // when tgl-btn-reject get a click
    if (target == btnReject) {
        // target button become active
        btnReject.classList.remove(...inActiveBtn);
        btnReject.classList.add(...activeBtn);
    }
    updateAvailableTotal();
    updateJobList();
})
// update joblist
function updateJobList() {
    // at first all jobs become hidden
    noJob.classList.add("hidden")
    for (const activeJob of allActiveJobs) {
        activeJob.classList.add("hidden");
    }
    // target jobs become viusible
    if (btnAll.classList.contains(...activeBtn)) {
        for (const job of allActiveJobs) {
            job.classList.remove("hidden");
        }
        console.log(allActiveJobs, allActiveJobs.length);

        if (allActiveJobs.length == 0) {
            noJob.classList.remove("hidden");
        }
    }
    if (btnInterview.classList.contains(...activeBtn)) {
        for (const job of allInterviewJobs) {
            job.classList.remove("hidden");
        }
        if (allInterviewJobs.length == 0) {
            noJob.classList.remove("hidden");
        }
    }
    if (btnReject.classList.contains(...activeBtn)) {
        for (const job of allRejectedJobs) {
            job.classList.remove("hidden");
        }
        if (allRejectedJobs.length == 0) {
            noJob.classList.remove("hidden");
        }
    }
}

// when any action button get a click
document.getElementById("jobs-container").addEventListener("click", function (event) {
    const targetElement = event.target;
    const targetCard = targetElement.closest(".card");
    // when action-btn-interview get a click
    if (targetElement.classList.contains("interview")) {
        targetCard.querySelector(".current-status").innerText = "interview";
        targetCard.querySelector(".current-status").classList.add("text-green-700");
        targetCard.classList.add("interview-card");
        targetCard.classList.remove("rejected-card");
    }
    // when action-btn-rejected get a click
    if (targetElement.classList.contains("rejected")) {
        targetCard.querySelector(".current-status").innerText = "rejected";
        targetCard.querySelector(".current-status").classList.add("text-red-700");
        targetCard.classList.add("rejected-card");
        targetCard.classList.remove("interview-card");
    }
    // when action-btn-delete get a click
    if (targetElement.classList.contains("delete")) {
        targetCard.classList.remove("rejected-card");
        targetCard.classList.remove("interview-card");
        targetCard.classList.remove("active-card");
        targetCard.classList.add("deleted-card");
        targetCard.classList.add("hidden");
    }
    updateRecords();
    updateAvailableTotal();
    updateJobList();
})

