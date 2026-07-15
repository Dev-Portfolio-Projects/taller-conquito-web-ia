import navbarTemplate from "./Navbar.html?raw";

const getActiveLink = (section) => {
    return window.location.hash === `#${section}`
        ? "nav-active"
        : "";
};

const Navbar = () => {
    return navbarTemplate
        .replaceAll("{{catalogo}}", getActiveLink("catalogo"))
        .replaceAll("{{historia}}", getActiveLink("historia"))
        .replaceAll("{{contacto}}", getActiveLink("contacto"));
};

export default Navbar;
