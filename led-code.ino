const int blueLedPin = 5;
const int redLedPin = 4;
const int greenLedPin = 3;
const int yellowLedPin = 2;
void setup() {
  Serial.begin(9600);
  pinMode(blueLedPin, OUTPUT);
  pinMode(redLedPin, OUTPUT);
  pinMode(greenLedPin, OUTPUT);
  pinMode(yellowLedPin, OUTPUT);
}
void loop() {
  if (Serial.available() > 0) {
    String command = Serial.readStringUntil('\n');
    if (command == "blueledon"){
      digitalWrite(blueLedPin, HIGH);} 
    else if (command == "blueledoff"){
      digitalWrite(blueLedPin, LOW);}
    else if (command == "redledon") {
      digitalWrite(redLedPin, HIGH);} 
    else if (command == "redledoff") {
      digitalWrite(redLedPin, LOW);}
    else if (command == "greenledon") {
      digitalWrite(greenLedPin, HIGH);} 
    else if (command == "greenledoff") {
      digitalWrite(greenLedPin, LOW);}
    else if (command == "yellowledon") {
      digitalWrite(yellowLedPin, HIGH);} 
    else if (command == "yellowledoff") {
      digitalWrite(yellowLedPin, LOW);}
}} 
