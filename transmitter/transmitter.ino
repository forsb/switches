/*
   1 - GND
   2 - VCC 3.3V !!! NOT 5V
   3 - CE   to Arduino pin 9
   4 - CSN  to Arduino pin 4
   5 - SCK  to Arduino pin 13
   6 - MOSI to Arduino pin 11
   7 - MISO to Arduino pin 12
   8 - UNUSED  
*/

//nRF24L01
#include <SPI.h>
#include "RF24.h"

//Sleep
#include <avr/sleep.h>
#include <avr/power.h>

#include "transmitter.h"
#include "dht.h"

#define CE_PIN      9
#define CSN_PIN     4
#define BUTTON_PIN  2
#define LED_PIN    10
#define DHT_PIN     3
#define DHT_POW_PIN 7

//const uint64_t pipe = 0xF0F0F0F0E1LL; // Define the transmit pipe
const uint64_t pipe = 0xADADADADE1LL;
//char message[] = "buttonMox";
SensorPayload message;

uint16_t packageCount = 0;

RF24 radio(CE_PIN, CSN_PIN); // Create a Radio

void setup() {
  //Serial.begin(9600);
  //pinMode(BUTTON_PIN, INPUT);
  //digitalWrite(BUTTON_PIN, HIGH);  
    
  radio.begin();
  radio.enableDynamicPayloads();
  radio.setAutoAck(1);
  radio.setRetries(15,15);
  radio.setDataRate(RF24_250KBPS);
  radio.setPALevel(RF24_PA_MAX);
  radio.setChannel(76);
  radio.setCRCLength(RF24_CRC_8); 

  message.sensorId = 1;

  //delay(100);

  //Serial.println(SPCR);
}

void loop() {  
  //enterSleep();
  message.packageCount = 1337;
  message.sensorValue.powerTemp.temp = 12345;
  radio.write( &message, sizeof(message) );

  delay(500);
  //Serial.println(message);
}

/*void isr() {
  detachInterrupt(digitalPinToInterrupt(BUTTON_PIN));
}

void enterSleep(void) {
  attachInterrupt(digitalPinToInterrupt(BUTTON_PIN), isr, LOW);
  delay(100);
  
  unsigned int spi_save = SPCR;
  SPCR = 0;
 
  set_sleep_mode(SLEEP_MODE_PWR_DOWN);  
  sleep_enable();

  power_all_disable();
  
  sleep_mode();  
  
  sleep_disable(); 
  power_all_enable(); 
  
  SPCR = spi_save;
   
}*/


