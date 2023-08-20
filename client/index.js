import Dashboard from "./pages/Dashboard.js";
import Posts from "./pages/Postes.js";
import Products from "./pages/Products.js";
import About from "./pages/About.js";
import NotFound from "./pages/Notfound.js";

// ?  1.what view show to user based on route ?
function router(params) {
  const routes = [
    { path: "/", view: Dashboard },
    { path: "/products", view: Products },
    { path: "/posts", view: Posts },
    { path: "/about", view: About },
  ];
  const potentialRoutes = routes.map((item) => {
    return {
      route: item,
      isMatch: location.pathname === item.path,
    };
  });

  let match = potentialRoutes.find((route) => route.isMatch);
  if (!match) {
    match = {
      route: { path: "/", view: NotFound },
      isMatch: true,
    };
  }
  document.querySelector("#app").innerHTML = match.route.view();
}

//?  2.push user to new url :
function navigateTo(url) {
  history.pushState(null, null, url);
  router();
}

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-link")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});

// * SIDEBAR TOGGLER :

const sidebarToggler = document.querySelector(".sidebar-toggler");
const sidebar = document.querySelector(".nav");

sidebarToggler.addEventListener("click", () => {
  sidebar.classList.toggle("mini-sidebar");
});
