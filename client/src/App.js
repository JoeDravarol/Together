import React, {useEffect, useState} from "react";
import Modal from "features/modal/Modal";
import RejectionModal from "features/modal/RejectionModal";
import WelcomeUserModal from "features/modal/WelcomeUserModal";
import { useRoutingContext } from "contexts/RoutingContext";
import { useAuthContext } from "contexts/AuthContext";
import LandingPage from "features/home/LandingPage";
import CalendarPage from "pages/CalendarPage";

function App() {
  const routing = useRoutingContext();
  const auth = useAuthContext();
  const isAuthenticated = auth.isAuthenticated();
  const isNot100Dever = auth.isNot100Dever();
  const deleteNeedsToBeWelcome = auth.deleteNeedsToBeWelcome;
  //Sets rejection modal to true because updating state is a pain
  //Line 52 will prevent the modal from rendering unless user is not 100Dever
  const [rejectionModalOpen, setRejectionModalOpen] = useState(true)
  const rejectionModalContext = { isOpen: rejectionModalOpen, handleClose: () => { setRejectionModalOpen(false) } }
  const [welcomeUserModalOpen, setWelcomeUserModalOpen] = useState(false)
  const welcomeUserModalContext = { isOpen: welcomeUserModalOpen, handleClose: () => { 
    setWelcomeUserModalOpen(false) 
    deleteNeedsToBeWelcome()
  }}
  useEffect(() => {
    if (auth.user)
      setWelcomeUserModalOpen(auth.needsToBeWelcome())
  }, [auth])

  return (
    <>
      {isAuthenticated &&  (
         <Modal context={welcomeUserModalContext}>
          <WelcomeUserModal handleClose={welcomeUserModalContext.handleClose}/>
          </Modal>
      )}
      {isNot100Dever && (
        <Modal context={rejectionModalContext}>
          <RejectionModal handleClose={rejectionModalContext.handleClose}/>
        </Modal>
      )}

      {routing.currentPage === "landingPage" && (
        <div className="bg-primary flex justify-center">
          <div className="w-full tablet:w-11/12 desktop:w-2/3">
            <LandingPage />
          </div>
        </div>
      )}
      {routing.currentPage === "calendarPage" && <CalendarPage/>}
    </>
  );
}

export default App;
