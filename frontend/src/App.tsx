import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AboutPage from "./pages/AboutPage";
import CitiesPage from "./pages/CitiesPage";
import CityPage from "./pages/CityPage";
import CountriesPage from "./pages/CountriesPage";
import CountryPage from "./pages/CountryPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import PlacePage from "./pages/PlacePage";
import PlacesPage from "./pages/PlacesPage";
import SearchPage from "./pages/SearchPage";

export default function App() {
  return (
    <BrowserRouter>
      {/* BrowserRouter watches the URL and React Router renders its matching page. */}
      <Routes>
        {/* These routes share Layout; its Outlet is where the selected page appears. */}
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="countries" element={<CountriesPage />} />
          <Route path="countries/:id" element={<CountryPage />} />
          <Route path="cities" element={<CitiesPage />} />
          <Route path="cities/:id" element={<CityPage />} />
          <Route path="places" element={<PlacesPage />} />
          <Route path="places/:id" element={<PlacePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
