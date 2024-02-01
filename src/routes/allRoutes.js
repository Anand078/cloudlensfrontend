import React from "react"

import Dashboard from "../pages/Home/index"
// Charts
import ChartApex from "../pages/Charts/Apexcharts"
import ChartistChart from "../pages/Charts/ChartistChart"
import ChartjsChart from "../pages/Charts/ChartjsChart"
import EChart from "../pages/Charts/EChart"
import SparklineChart from "../pages/Charts/SparklineChart"

//Icons
import IconDripicons from "../pages/Icons/IconDripicons"
import IconMaterialdesign from "../pages/Icons/IconMaterialdesign"
import TypiconsIcon from "../pages/Icons/IconTypicons"
import IconIon from "../pages/Icons/IconIon"
import ThemifyIcon from "../pages/Icons/IconThemify"
import IconFontawesome from "../pages/Icons/IconFontawesome"

//Tables
import BasicTables from "../pages/Tables/BasicTables"
import DatatableTables from "../pages/Tables/DatatableTables"
import ResponsiveTables from "../pages/Tables/ResponsiveTables"
import EditableTables from "../pages/Tables/EditableTables"

// Forms
import FormElements from "../pages/Forms/FormElements"
import FormAdvanced from "../pages/Forms/FormAdvanced"
import FormEditors from "../pages/Forms/FormEditors"
import FormValidations from "../pages/Forms/FormValidations"
import FormMask from "../pages/Forms/FormMask"
import FormRepeater from "../pages/Forms/FormRepeater"
import FormUpload from "../pages/Forms/FormUpload"
import FormWizard from "../pages/Forms/FormWizard"
import FormXeditable from "../pages/Forms/FormXeditable"

//Ui
import UiAlert from "../pages/Ui/UiAlert"
import UiButtons from "../pages/Ui/UiButtons"
import UiCards from "../pages/Ui/UiCards"
import UiCarousel from "../pages/Ui/UiCarousel"
import UiColors from "../pages/Ui/UiColors"
import UiDropdown from "../pages/Ui/UiDropdown"
import UiGeneral from "../pages/Ui/UiGeneral"
import UiGrid from "../pages/Ui/UiGrid"
import UiImages from "../pages/Ui/UiImages"
import UiLightbox from "../pages/Ui/UiLightbox"
import UiModal from "../pages/Ui/UiModal"
import UiTabsAccordions from "../pages/Ui/UiTabsAccordions"
import UiVideo from "../pages/Ui/UiVideo"
import UiRating from "../pages/Ui/UiRating"
import UiRangeSlider from "../pages/Ui/UiRangeSlider"

//Pages
import PagesTimeline from "../pages/Utility/pages-timeline"
import PagesInvoice from "../pages/Utility/PagesInvoice"
import PagesFaqs from "../pages/Utility/pages-faqs"
import PagesDirectory from "../pages/Utility/PagesDirectory"
//-----------------our routes----------------------------
import CapOverview from "pages/Capabilities/Overview"
import ArbOverview from "pages/ARB/Overview"
import AccOverview from "pages/Accelerator/Overview"
import ReviewOverview from "pages/ReviewOverview/Overview"
import ReviewReport from "pages/ReviewReport/Overview"
import Blog from "pages/Home/Blog"
import TechSession from "pages/Home/TechSessions"
const userRoutes = [
  //-----------------our routes----------------------------
  //Home
  { path: "/dashboard", component: <Dashboard /> },
  //Capabilities
  { path: "cap/overview", component: <CapOverview /> },
  //Accelerator
  { path: "accelerator/overview", component: <AccOverview /> },
  //ARB
  { path: "arb/overview", component: <ArbOverview /> },
  //Review Overview
  { path: "arb/:projectname/overview", component: <ReviewOverview /> },
  //Review Report
  { path: "arb/:projectname/review", component: <ReviewReport /> },
  //Blog
  { path: "/blogs", component: <Blog /> },
  //Tech session
  { path: "/techsessions", component: <TechSession /> },
  //-----------------our routes----------------------------

  //Charts
  { path: "/apex-charts", component: <ChartApex /> },
  { path: "/chartist-charts", component: <ChartistChart /> },
  { path: "/chartjs-charts", component: <ChartjsChart /> },
  { path: "/e-charts", component: <EChart /> },
  { path: "/sparkline-charts", component: <SparklineChart /> },

  // Icons
  { path: "/icons-dripicons", component: <IconDripicons /> },
  { path: "/icons-materialdesign", component: <IconMaterialdesign /> },
  { path: "/icons-fontawesome", component: <IconFontawesome /> },
  { path: "/icons-ion", component: <IconIon /> },
  { path: "/icons-themify", component: <ThemifyIcon /> },
  { path: "/icons-typicons", component: <TypiconsIcon /> },

  // Tables
  { path: "/tables-basic", component: <BasicTables /> },
  { path: "/tables-datatable", component: <DatatableTables /> },
  { path: "/tables-responsive", component: <ResponsiveTables /> },
  { path: "/tables-editable", component: <EditableTables /> },

  // Forms
  { path: "/form-elements", component: <FormElements /> },
  { path: "/form-advanced", component: <FormAdvanced /> },
  { path: "/form-editors", component: <FormEditors /> },
  { path: "/form-mask", component: <FormMask /> },
  { path: "/form-repeater", component: <FormRepeater /> },
  { path: "/form-uploads", component: <FormUpload /> },
  { path: "/form-wizard", component: <FormWizard /> },
  { path: "/form-validation", component: <FormValidations /> },
  { path: "/form-xeditable", component: <FormXeditable /> },

  // Ui
  { path: "/ui-alerts", component: <UiAlert /> },
  { path: "/ui-buttons", component: <UiButtons /> },
  { path: "/ui-cards", component: <UiCards /> },
  { path: "/ui-carousel", component: <UiCarousel /> },
  { path: "/ui-dropdowns", component: <UiDropdown /> },
  { path: "/ui-general", component: <UiGeneral /> },
  { path: "/ui-grid", component: <UiGrid /> },
  { path: "/ui-images", component: <UiImages /> },
  { path: "/ui-lightbox", component: <UiLightbox /> },
  { path: "/ui-modals", component: <UiModal /> },
  { path: "/ui-tabs-accordions", component: <UiTabsAccordions /> },
  { path: "/ui-video", component: <UiVideo /> },
  { path: "/ui-rating", component: <UiRating /> },
  { path: "/ui-rangeslider", component: <UiRangeSlider /> },

  //Utility
  { path: "/pages-timeline", component: <PagesTimeline /> },
  { path: "/pages-invoice", component: <PagesInvoice /> },
  { path: "/pages-directory", component: <PagesDirectory /> },
  { path: "/pages-faqs", component: <PagesFaqs /> },

  // this route should be at the end of all other routes
  { path: "/", component: <Dashboard /> },
]

export { userRoutes }
