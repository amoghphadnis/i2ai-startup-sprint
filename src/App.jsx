import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "@layouts/MainLayout";
import { routes } from "./routes/routes";
import "./App.css";

function App() {
  return (
    <>
      <MainLayout>
        <Routes>
          {routes.map((route) => (
            <Route
            key={route.path}
            path={route.path}
            element={route.element}
            />
          ))}
        </Routes>
      </MainLayout>
    </>
  );
}

export default App;
