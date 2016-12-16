/*
   --- nRF24L01 pinout ---
   
   1 - GND
   2 - VCC  3.3V !!! NOT 5V
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
#include "transmitter.h"
#include "dht.h"

//Sleep
#include <avr/sleep.h>
#include <avr/power.h>


#define CE_PIN      9
#define CSN_PIN     4

#define DHT_PIN     3
#define DHT_POW_PIN 7

#define PHOTO_PIN   2
#define POT_PIN     0


const uint64_t pipe = 0xADADADADE1LL;
//char message[] = "buttonMox";
//SensorPayload message;
char message[9];

uint16_t packageCount = 0;
uint16_t blinkCount = 0;

RF24 radio(CE_PIN, CSN_PIN); // Create a Radio
dht DHT;

void setup() {
  Serial.begin(115200);
  
  // Power DHT22
  pinMode(DHT_POW_PIN, OUTPUT);  
  digitalWrite(DHT_POW_PIN, HIGH);
    
  // Start radio
  radio.begin();
  radio.enableDynamicPayloads();
  radio.setAutoAck(1);
  radio.setRetries(15,15);
  radio.setDataRate(RF24_250KBPS);
  radio.setPALevel(RF24_PA_MAX);
  radio.setChannel(76);
  radio.setCRCLength(RF24_CRC_8); 
  radio.printDetails(); 

  // Set sensor ID
  message[0] = 1;
}

void loop() {  
  //enterSleep();
  
  // --- DHT22 ---
  Serial.print("DHT22, \t");
  int chk = DHT.read22(DHT_PIN);
  
  if (chk != DHTLIB_OK) {
    Serial.print("DHT error."); 
    Serial.println(chk);
  }
  else {
    Serial.print(DHT.humidity, 1);
    Serial.print(",\t");
    Serial.println(DHT.temperature, 1);
  }

  // --- PHOTO ---
  int photoval = analogRead(PHOTO_PIN);
  int potval = analogRead(POT_PIN);
  Serial.print("PHOTO, \t");
  Serial.println(photoval-potval);
  if (photoval-potval > 0) {
    blinkCount ++;
  }
  
  
  
  int16_t temp = (int) DHT.temperature*100;
  int16_t humid = (int) DHT.humidity*100;
  message[1] = (packageCount | 0xF0) >> 8;
  message[2] = (packageCount | 0x0F);
  message[3] = (temp | 0xF0) >> 8;
  message[4] = (temp | 0x0F);
  message[5] = (humid | 0xF0) >> 8;
  message[6] = (humid | 0x0F);
  message[7] = (blinkCount | 0xF0) >> 8;
  message[8] = (blinkCount | 0x0F);
  
  // --- RADIO ---

  
  packageCount ++;
  
  delay(1000);
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


