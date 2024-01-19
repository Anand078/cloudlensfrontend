import PropTypes from "prop-types";
import React, { useEffect, useCallback, useRef } from "react";

const capConfig = {
  title: "Capabilities",
  icon: "ti-map",
  subdata: [
    {
      title: "Overview",
      link: "/cap-overview",
    },
    // {
    //   title: "List",
    //   link: "/cap-list",
    // },
    {
      title: "Manage",
      link: "/cap-manage",
    },
  ],
};

const AccConfig = {
  title: "Accelerator",
  icon: "ti-dashboard",
  subdata: [
    {
      title: "Overview",
      link: "/acc-overview",
    },
    {
      title: "List",
      link: "/acc-list",
    },
    {
      title: "Manage",
      link: "/acc-manage",
    },
  ],
};

const Arconfig = {
  title: "Architecture Review",
  icon: "ti-map",
  subdata: [
    {
      title: "Overview",
      link: "/arb/overview",
    },
    {
      title: "List",
      link: "/arc-list",
    },
    {
      title: "Manage",
      link: "/arc-manage",
    },
  ],
};

// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import withRouter from "components/Common/withRouter";
import { Link, useLocation } from "react-router-dom";

import SidebarItem from "share/sidebarItem";
// import SideBarMenu from "share/sidebarMenu"

const SidebarContent = (props) => {
  const location = useLocation();
  const ref = useRef();
  const path = location.pathname;

  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag
        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  const activeMenu = useCallback(() => {
    const pathName = location.pathname;
    const fullPath = pathName;
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (fullPath === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  useEffect(() => {
    new MetisMenu("#side-menu");
    activeMenu();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    activeMenu();
  }, [activeMenu]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  return (
    <React.Fragment>
      <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{("Main")} </li>

            <SidebarItem
              props={props}
              icon={"ti-home"}
              link={"/dashboard"}
              title={"Dashboard"}
            />
            <li className="menu-title">{("Components")}</li>
            <SidebarItem
              props={props}
              icon={"ti-map"}
              link={"/cap/overview"}
              title={"Capabilities"}
            />
            <SidebarItem
              props={props}
              icon={"ti-dashboard"}
              link={"/accelerator/overview"}
              title={"Accelerator"}
            />
            <SidebarItem
              props={props}
              icon={"mdi mdi-billboard"}
              link={"/arb/overview"}
              title={"Architecture Review"}
            />

            {/* <li className="menu-title">{("Old Components")}</li>
            <SideBarMenu props={props} config={capConfig} />
            <SideBarMenu props={props} config={AccConfig} />
            <SideBarMenu props={props} config={Arconfig} /> */}

            {/* <li style={{ margin: "100px 0", padding: 0 }}></li>
            <li className="menu-title">{("Extras")}</li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ti-package"></i>
                <span>{("UI Elements")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/ui-alerts">{("Alerts")}</Link>
                </li>
                <li>
                  <Link to="/ui-buttons">{("Buttons")}</Link>
                </li>
                <li>
                  <Link to="/ui-cards">{("Cards")}</Link>
                </li>
                <li>
                  <Link to="/ui-dropdowns">{("Dropdowns")}</Link>
                </li>
                <li>
                  <Link to="/ui-grid">{("Grid")}</Link>
                </li>
                <li>
                  <Link to="/ui-modals">{("Modals")}</Link>
                </li>
                <li>
                  <Link to="/ui-session-timeout">
                    {("Session Timeout")}
                  </Link>
                </li>
                <li>
                  <Link to="/ui-tabs-accordions">
                    {("Tabs & Accordions")}
                  </Link>
                </li>
                <li>
                  <Link to="/ui-general">{("General")}</Link>
                </li>
                <li>
                  <Link to="/ui-rating">{("Rating")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="waves-effect">
                <i className="ti-receipt"></i>
                <span className="badge rounded-pill bg-success float-end">
                  9
                </span>
                <span>{("Forms")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/form-elements">{("Form Elements")}</Link>
                </li>
                <li>
                  <Link to="/form-validation">
                    {("Form Validation")}
                  </Link>
                </li>
                <li>
                  <Link to="/form-advanced">{("Form Advanced")}</Link>
                </li>
                <li>
                  <Link to="/form-editors">{("Form Editors")}</Link>
                </li>
                <li>
                  <Link to="/form-uploads">{("Form File Upload")} </Link>
                </li>
                <li>
                  <Link to="/form-xeditable">{("Form Xeditable")}</Link>
                </li>
                <li>
                  <Link to="/form-repeater">{("Form Repeater")}</Link>
                </li>
                <li>
                  <Link to="/form-wizard">{("Form Wizard")}</Link>
                </li>
                <li>
                  <Link to="/form-mask">{("Form Mask")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ti-pie-chart"></i>
                <span>{("Charts")}</span>
              </Link>

              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/chartist-charts">{("Chartist Chart")}</Link>
                </li>
                <li>
                  <Link to="/e-charts">{("E Chart")}</Link>
                </li>
                <li>
                  <Link to="/chartjs-charts">{("Chartjs Chart")}</Link>
                </li>
                <li>
                  <Link to="/apex-charts">{("Apex charts")}</Link>
                </li>
                <li>
                  <Link to="/sparkline-charts">
                    {("Sparkline Chart")}
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ti-view-grid"></i>
                <span>{("Tables")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/tables-basic">{("Basic Tables")}</Link>
                </li>
                <li>
                  <Link to="/tables-datatable">{("Data Tables")}</Link>
                </li>
                <li>
                  <Link to="/tables-responsive">
                    {("Responsive Table")}
                  </Link>
                </li>
                <li>
                  <Link to="/tables-editable">{("Editable Table")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ti-face-smile"></i>
                <span>{("Icons")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/icons-materialdesign">
                    {("Material Design")}
                  </Link>
                </li>
                <li>
                  <Link to="/icons-fontawesome">{("Font awesome")}</Link>
                </li>
                <li>
                  <Link to="/icons-ion">{("Ion Icons")}</Link>
                </li>
                <li>
                  <Link to="/icons-themify">{("Themify Icons")}</Link>
                </li>
                <li>
                  <Link to="/icons-dripicons">{("Dripicons")}</Link>
                </li>
                <li>
                  <Link to="/icons-typicons">{("Typicons Icons")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ti-support"></i>
                <span>{("Extra Pages")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/pages-timeline">{("Timeline")}</Link>
                </li>
                <li>
                  <Link to="/pages-invoice">{("Invoice")}</Link>
                </li>
                <li>
                  <Link to="/pages-directory">{("Directory")}</Link>
                </li>
                <li>
                  <Link to="/pages-faqs">{("FAQs")}</Link>
                </li>
              </ul>
            </li> */}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
};

export default withRouter(SidebarContent);
