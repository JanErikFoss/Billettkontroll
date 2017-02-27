import { Platform, Alert } from "react-native"
import FCM, { FCMEvent, RemoteNotificationResult } from "react-native-fcm"

let db = null
let uid = null

module.exports.init = (_db, _uid) => {
  db = _db
  uid = _uid

  FCM.requestPermissions() // for iOS
  FCM.getFCMToken()
  .then(saveToken)
  .catch(err => console.log("Failed to get device token for push messages: ", err))
}

FCM.on(FCMEvent.Notification, notif => {
  Alert.alert(notif.notification.title, notif.notification.body)
  Platform.OS === "ios" && notif.finish(RemoteNotificationResult.NoData)
})

const refreshListener = FCM.on(FCMEvent.RefreshToken, saveToken)

const saveToken = token => {
  db.ref("users/" + uid + "/deviceToken").set(token)
  .then(() => console.log("Device token saved"))
  .then(() => refreshListener.remove())
  .catch(err => console.log("Failed to save device token: ", err))
}
