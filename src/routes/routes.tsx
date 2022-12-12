import { Route, Routes } from "react-router-dom";
import { DirectionsPage } from "../pages/directions/DirectionsPage";
import { GroupsPage } from "../pages/groups/GroupsPage";
import { MainPage } from "../pages/main/MainPage";
import { StatusesPage } from "../pages/statuses/StatusesPage";
import { StudentsPage } from "../pages/students/StudentsPage";

export const useRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/students" element={<StudentsPage />} />
      <Route path="/groups" element={<GroupsPage />} />
      <Route path="/statuses" element={<StatusesPage />} />
      <Route path="/directions" element={<DirectionsPage />} />
    </Routes>
  );
}