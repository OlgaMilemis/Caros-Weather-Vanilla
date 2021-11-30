function dayAndNight() {
  let currentDay = new Date();
  let dayNight = currentDay.getHours();
  if (dayNight < 12) {
    let bodyColor = document.querySelector("body");
    bodyColor.style.background = "purple";
  } else {
    let bodyColor = document.querySelector("body");
    bodyColor.style.background = "orange";
  }
}
dayAndNight();
