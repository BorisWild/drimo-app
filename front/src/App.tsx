import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Admin from "./Admin/Admin";
import Client from "./Client/Client";
import { getCookie } from "./Helpers/cookies";
import Manager from "./Manager/Manager";
import { INotification } from "./models/INotification";
import { useAppDispatch, useAppSelector } from "./store/hooks/redux";
import { notificationsSlice } from "./store/reducers/NotificationsSlice";
import Notification from "./UIkit/Notification/Notification";

function App() {

  const location = useLocation();
  const { notification } = useAppSelector(state => state.notificationsReducer)
  const { notificate } = notificationsSlice.actions
  const dispatch = useAppDispatch()

  let router = (
    <Client />
  )

  if (location.pathname.includes('manager')) {

    router = (
      <Manager />
    )
  }

  if (location.pathname.includes('admin')) {

    router = (
      <Admin />
    )
  }

  useEffect(() => {

  }, [notification])

  return (
    <div className="wrapper">
      <div className="notifications-list">
        {
          notification && <Notification notification={notification} />
        }

      </div>


      {router}
    </div>
  )
}

export default App;
