import $ from 'jquery'

const HideSideNav = () => {
  var width = document.getElementById("mySidenav").style.width;
  if (width === "250px") {
    document.getElementById("mySidenav").style.width = "0px";
    $('.animated-icon').toggleClass('open');
  }
}

export default HideSideNav