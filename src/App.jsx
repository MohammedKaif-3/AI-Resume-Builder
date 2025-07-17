import Home from './pages/Home';
import {Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/signup';
import ForgotPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import Account from './pages/Account';
import VerifyEmail from './pages/VerifyEmail';
import CreateResume from './pages/CreateResume';
import SelectTemplate from './pages/SelectTemplate';
import CheckResumeScore from './pages/CheckResumeScore';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/account" element={<Account />} />
        <Route path="/select-template" element={<SelectTemplate />} />
        <Route path="/create-resume/:templateId" element={<CreateResume />} />
        <Route path="/edit-resume/:templateId" element={<CreateResume />} />
        <Route path="/check-resume-score" element={<CheckResumeScore />} />
      </Routes>

  );
}

export default App;
