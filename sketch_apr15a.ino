byte sensorpir = 12;
byte standby = 0;
byte toggle = 1;

void setup() {
  pinMode(sensorpir, INPUT); 
  Serial.begin(9600);
}

void loop() {
  if(digitalRead(sensorpir) == HIGH && standby == LOW) { 
    Serial.print("Movement detected\n"); // Send signal to /dev/tty
    standby = HIGH; // Stop detecting movement to allow computer to take pictures, upload, etc
    delay(5000);
  } else {
    if(Serial.read() == toggle){
      standby = LOW; // Computer will send us toggle byte to continue detecting movement
    }
  }
}
