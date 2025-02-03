import { Navigate, Route, Routes } from "react-router";
import { Login } from "./auth/login/page";
import { Register } from "./auth/register/page";
import ProtectedRoute from "./routes/protected-routes";
import { Dash } from "./dash/page";
import { Tasks } from "./dash/tasks/page";
import { TaskDetails } from "./dash/tasks/task-details/page";
import { CreateTask } from "./dash/tasks/task-create/page";
import { RequestResetPassword } from "./auth/request-reset-password/page";
import { ResetPassword } from "./auth/reset-password/page";
import { TaskUpdate } from "./dash/tasks/task-update/page";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/login" replace />} />

      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password" element={<RequestResetPassword />} />
      <Route path="reset-password" element={<ResetPassword />} />

      <Route path="dash" element={<ProtectedRoute />}>
        <Route element={<Dash />}>
          <Route index element={<Navigate to="/dash/tasks" />} />
          <Route path="tasks" element={<Tasks />}>
            <Route path=":taskId" element={<TaskDetails />} />
            <Route path="create" element={<CreateTask />} />
            <Route path=":taskId/update" element={<TaskUpdate />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
