import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/contact/Contact";
import Header from "./components/header/Header";
import PatientPortalHeader from "./components/PatientPortalHeader/PatientPortalHeader";
import DoctorPortalHeader from "./components/DoctorPortalHeader/DoctorPortalHeader";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import AttendantLogin from "./components/Attendant/AttendantLogin/AttendantLogin";
import DoctorLogin from "./components/Doctor/DoctorLogin/DoctorLogin";
import DoctorSignUp from "./components/Doctor/DoctorSignUp/DoctorSignUp";
import AppointmentModal from "./components/AppointmentModal/AppointmentModal";
import BookAppointment from "./components/BookAppointmentForm/BookAppointmentForm";
import BookAmbulance from "./components/BookAmbulance/BookAmbulance";
import Modal from "./components/modal/modal";
import SideNavBar from "./components/sideNavBar/SideNavBar";
import { useState, useRef, useEffect } from "react";
import Footer from "./components/Footer/Footer";
import Services from "./pages/services/Services";
import PatientPortal from "./pages/Patient-portal/PatientPortal";
import DoctorPortal from "./pages/DoctorPortal/DoctorPortal";
import DriverPortal from "./pages/DriverPortal/DriverPortal";
import LabAttendantPortal from "./pages/LabAttendantPortal/LabAttendantPortal";
import DriverLogin from "./components/DriverLogin/DriverLogin";
import Doctors from "./pages/Doctors/Doctors";
import LabTests from "./pages/LabTests/LabTests";
import VideoCall from "./pages/videoCall/videoCall";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Pharmacy from "./pages/pharmacy/Pharmacy";
import BookLabTest from "./components/bookLabTest/BookLabTest";
import UpcomingAppointments from "./pages/UpcomingAppointments/UpcomingAppointments";
import AppointmentsHistory from "./pages/AppointmentsHistory/AppointmentsHistory";
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentForm, setcurrentForm] = useState("login");
  const [ModalOpen, setModalOpen] = useState("");
  const [IsPatientLoggedIn,setIsPatientLoggedIn]=useState(false);
  const [IsPatientSignedUp,setIsPatientSignedUp]=useState(false);
  const [IsDoctorLoggedIn,setIsDoctorLoggedIn]=useState(false);
  const [IsDoctorSignedUp,setIsDoctorSignedUp]=useState(false);
  const [IsDriverLoggedIn,setIsDriverLoggedIn]=useState(false);
  const [IsAttendantLoggedIn,setIsAttendantLoggedIn]=useState(false);
  const sidebarRef = useRef(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openAppointmentModal = () => {
    setIsAppointmentModalOpen(true);
    setModalOpen("Appointment");
    closeMenu();
  };
  const closeAppointmentModal = () => {
    setIsAppointmentModalOpen(false);
    setModalOpen("");
  };
  const openLabTestModal = () => {
    setIsAppointmentModalOpen(false);
    setModalOpen("LabTest");
  };
  const openAmbulanceModal = () => {
    setIsAppointmentModalOpen(true);
    setModalOpen("Ambulance");
    closeMenu();
  };
  const closeAmbulanceModal = () => {
    setIsAppointmentModalOpen(false);
    setModalOpen("");
  };
  const closeLabTestModal = () => {
    setIsAppointmentModalOpen(false);
    setModalOpen("");
  };

  const openMenu = () => {
    setIsMenuOpen(true);
    document.body.classList.add('no-scroll'); 
    console.log("Menu opened:", isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove('no-scroll'); 
  };
  const [userType, setUserType] = useState("patient");
  const switchUserType = (usertype) => {
    setUserType(usertype);
  };

  const switchForm = () => {
    setcurrentForm(currentForm === "login" ? "signup" : "login"); 
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeMenu(); 
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef]);
  useEffect(() => {
    const patientLoggedIn = localStorage.getItem("isPatientLoggedIn") === "true";
    const doctorLoggedIn = localStorage.getItem("isDoctorLoggedIn") === "true";
  
    setIsPatientLoggedIn(patientLoggedIn);
    setIsDoctorLoggedIn(doctorLoggedIn);
  }, []);
  return (
    <div className="app-container">
      <BrowserRouter>
        {IsPatientLoggedIn ? 
        (
         
          <PatientPortalHeader
          openModal={openModal}
          openMenu={openMenu}
          isMenuOpen={isMenuOpen}
          setIsLoggedIn={setIsPatientLoggedIn}
          />
        ): IsDoctorLoggedIn ? (
          <PatientPortalHeader
          openModal={openModal}
          openMenu={openMenu}
          isMenuOpen={isMenuOpen}
          setIsLoggedIn={setIsDoctorLoggedIn}
          />
        ): IsDriverLoggedIn ? (
          <PatientPortalHeader
          openModal={openModal}
          openMenu={openMenu}
          isMenuOpen={isMenuOpen}
          setIsLoggedIn={setIsDriverLoggedIn}
          />
        ): IsAttendantLoggedIn ? (
          <PatientPortalHeader
          openModal={openModal}
          openMenu={openMenu}
          isMenuOpen={isMenuOpen}
          setIsLoggedIn={setIsAttendantLoggedIn}
          />
        ):
        (
          <Header
          openModal={openModal}
          openMenu={openMenu}
          isMenuOpen={isMenuOpen}
        />
        )
        }
        
        <main
          className={`main-section ${
            isMenuOpen ? "menu-open" : ""
          }`}
        >
          <SideNavBar
            openModal={openAppointmentModal}
            openAmbulanceModal={openAmbulanceModal}
            openLabTestModal={openLabTestModal}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            IsPatientLoggedIn={IsPatientLoggedIn}
            IsDoctorLoggedIn={IsDoctorLoggedIn}
            IsAttendantLoggedIn={IsAttendantLoggedIn}
            IsDriverLoggedIn={IsDriverLoggedIn}
            sidebarRef={sidebarRef}
          />        
          <div className="main-content">
            <Routes>
              <Route index element={<Home handleApptClick={openAppointmentModal} handleLoginClick={openModal}/>} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/pharmacy" element={<Pharmacy />} />
              <Route path="/patient-portal" element={
                  // <ProtectedRoute>
                    <PatientPortal />
                  // </ProtectedRoute> 
              }/>  
              <Route path="/doctor-portal" element={<DoctorPortal />} />
              <Route path="/doctor-portal/UpcomingAppointments" element={<UpcomingAppointments />} />
              <Route path="/doctor-portal/AppointmentsHistory" element={<AppointmentsHistory />} />
              <Route path="/DriverPortal" element={<DriverPortal />} />
              <Route path="/LabAttendantPortal" element={<LabAttendantPortal />} />
              <Route path="/doctors" element={<Doctors />} />  
              <Route path="/LabTests" element={<LabTests setIsAppointmentModalOpen={setIsAppointmentModalOpen} setModalOpen={setModalOpen}  />} />  
              <Route path="/VideoCall" element={<VideoCall/>} /> 
            </Routes>
          </div>  
        </main>

        <Footer />
      

      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        {currentForm === "login" ? (
          <div>
            <div className="login-signUp-btn-container">
              <button
                className="login-btn"
                id="login-pat-btn"
                onClick={() => switchUserType("patient")}
                style={{
                  backgroundColor:
                    userType === "patient" ? "lightblue" : "#7FA1C3",
                }}
              >
                Login As A Patient
              </button>
              <button
                className="login-btn"
                id="login-doc-btn"
                onClick={() => switchUserType("doctor")}
                style={{
                  backgroundColor:
                    userType === "doctor" ? "lightblue" : "#7FA1C3",
                }}
              >
                Login As A Doctor
              </button>
              <button
                className="login-btn"
                id="login-driver-btn"
                onClick={() => switchUserType("driver")}
                style={{
                  backgroundColor:
                    userType === "driver" ? "lightblue" : "#7FA1C3",
                }}
              >
                Login As A Driver
              </button>
              <button
                className="login-btn"
                id="login-Attendant-btn"
                onClick={() => switchUserType("attendant")}
                style={{
                  backgroundColor:
                    userType === "attendant" ? "lightblue" : "#7FA1C3",
                }}
              >
                Login As An Attendant
              </button>
            </div>
            {userType === "patient" ? (
              <Login closeModal={closeModal} switchForm={switchForm} setIsLoggedIn={setIsPatientLoggedIn}/>
            ) : userType==="doctor" ? (
              <DoctorLogin closeModal={closeModal} switchForm={switchForm} setIsLoggedIn={setIsDoctorLoggedIn}/>
            ) :
               userType==="attendant" ? (
              <AttendantLogin closeModal={closeModal} switchForm={switchForm} setIsLoggedIn={setIsAttendantLoggedIn}/>
            ) :
              userType==="driver" ? (
              <DriverLogin closeModal={closeModal} switchForm={switchForm} setIsLoggedIn={setIsDriverLoggedIn}/>
            ) :
            null
            }
          </div>
        ) : (
          <div>
            <div className="login-signUp-btn-container">
              <button
                className="SignUp-btn"
                id="SignUp-pat-btn"
                onClick={switchUserType}
                style={{
                  backgroundColor:
                    userType === "patient" ? "lightblue" : "#7FA1C3",
                }}
              >
                SignUp As A Patient
              </button>
              <button
                className="SignUp-btn"
                id="SignUp-doc-btn"
                onClick={switchUserType}
                style={{
                  backgroundColor:
                    userType === "doctor" ? "lightblue" : "#7FA1C3",
                }}
              >
                SignUp As A Doctor
              </button>
            </div>
            {userType === "patient" ? (
              <Signup closeModal={closeModal} switchForm={switchForm} />
            ) : (
              <DoctorSignUp closeModal={closeModal} switchForm={switchForm} />
            )}
          </div>
        )}
      </Modal>
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        closeModal={closeAppointmentModal}
      >
        {ModalOpen === "Appointment" ? (
          <BookAppointment closeModal={closeAppointmentModal}/>
        ) : ModalOpen === "Ambulance" ? (
          <BookAmbulance closeModal={closeAmbulanceModal} />
        ) : ModalOpen === "LabTest" ? (
          <BookLabTest closeModal={closeLabTestModal} />
        ) : null
        }
      </AppointmentModal>
      </BrowserRouter>
    </div>
  );
}

export default App;
