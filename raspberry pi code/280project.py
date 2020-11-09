import pyrebase
import firebase_admin
import getmac
import threading
import RPi.GPIO as GPIO
from firebase_admin import credentials
from firebase_admin import firestore

GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)

config = {
  "apiKey": "AIzaSyBDx0dqp6vnyFGj661eUWdi7KmaTNeIjnM",
  "authDomain": "csse280-finalproject-bb-wb.web.app",
  "databaseURL": "https://databaseName.firebaseio.com",
  "storageBucket": "projectId.appspot.com"
}
firebase = pyrebase.initialize_app(config)
auth = firebase.auth();

cred = credentials.Certificate("csse280-finalproject-bb-wb-firebase-adminsdk-p22iu-54a20fa03e.json")
firebase_admin.initialize_app(cred)

db= firestore.client();

#sign in to your data
while True:
  try:
    email = "a@b.co"#input("Enter your email\n")
    password  = "123456"#input("Enter your password\n")

    user = auth.sign_in_with_email_and_password(email,password);
    break;
  except:
    print("Invalid username/password try again\n")


uid = user['localId']

doc_ref = db.collection(uid);

# allDocs =doc_ref.get()
# roomCount =0;

# thisPiRooms = ["none"]; #need to make this be the number of devices
# #filter out devices not on this pi
# print("docref ",type(doc_ref))
# print("allDocs" ,allDocs)
# for doc in allDocs:
  
#   # currentDoc = doc_ref.document(doc.id)
#   # print("document mac" + doc.get('macAddress'))
#   # print( getmac.get_mac_address())
#   if doc.get('macAddress') == getmac.get_mac_address():
#     thisPiRooms[roomCount] = doc;
#     print(thisPiRooms)
#     roomCount = roomCount +1;

GPIO.setup(11,GPIO.OUT);
GPIO.setup(13,GPIO.OUT);
GPIO.setup(15,GPIO.OUT);
redPWM = GPIO.PWM(11,100)
greenPWM = GPIO.PWM(13,100)
bluePWM = GPIO.PWM(15,100)


# Create an Event for notifying main thread.
callback_done = threading.Event()

# Create a callback on_snapshot function to capture changes
def on_snapshot(col_snapshot, changes, read_time):
    print(u'Sees change')
    count = 0;0
    for doc in col_snapshot:
      if doc.get('macAddress') == getmac.get_mac_address():
        red = doc.get('red')
        green = doc.get('green')
        blue = doc.get('blue')
        brightness = doc.get('brightness')
        deviceName = doc.get('deviceName')
        effect = doc.get('effect')
        isOn = doc.get('isOn')  
        
        if count == 0: #use gpio pins R=17 G=27 B=22
          if isOn == 1:
            if effect == 0: #none
              redPWM.start((red/255)*100*brightness)
              bluePWM.start((blue/255)*100*brightness)
              greenPWM.start((green/255)*100)*brightness
            if effect == 1:
              redPWM.start((red/255)*100*brightness)
              bluePWM.start((blue/255)*100*brightness)
              greenPWM.start((green/255)*100)*brightness
            if effect == 2:
              redPWM.start((red/255)*100*brightness)
              bluePWM.start((blue/255)*100*brightness)
              greenPWM.start((green/255)*100)*brightness
            if effect == 3:
              redPWM.start((red/255)*100*brightness)
              bluePWM.start((blue/255)*100*brightness)
              greenPWM.start((green/255)*100)*brightness


    callback_done.set()


print("about to start snapshot")
# Watch the collection query
query_watch = doc_ref.on_snapshot(on_snapshot)

while 1:
      x=0

# GPIO.setup(11,GPIO.OUT);
# GPIO.setup(13,GPIO.OUT);
# GPIO.setup(15,GPIO.OUT);
# redPWM = GPIO.PWM(11,100)
# greenPWM = GPIO.PWM(13,100)
# bluePWM = GPIO.PWM(15,100)

# while 1:
#   count = 0;
#   #handle led colors
#   for room in thisPiRooms:
#     red = room.get('red')
#     green = room.get('green')
#     blue = room.get('blue')
#     brightness = room.get('brightness')
#     deviceName = room.get('deviceName')
#     effect = room.get('effect')
#     isOn = room.get('isOn')
    
#     if count == 0: #use gpio pins R=17 G=27 B=22
     
#       redPWM.start((red/255)*100)
#       bluePWM.start((blue/255)*100)
#       greenPWM.start((green/255)*100)

#     if count ==1: #use gpio pins R=5 G=6 B=26
#       GPIO.setup(5,GPIO.OUT);
#       GPIO.setup(6,GPIO.OUT);
#       GPIO.setup(26,GPIO.OUT);
#     count = count +1;







