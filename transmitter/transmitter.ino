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

#include <stdint.h>

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
uint8_t message[9];

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
  radio.openWritingPipe(pipe);

  // Set sensor ID
  message[0] = 12;
}

void loop() {  
  //enterSleep();
  
  // --- DHT22 ---
  //Serial.print("DHT22, \t");
  int chk = DHT.read22(DHT_PIN);
  
  if (chk != DHTLIB_OK) {
    //Serial.print("DHT error."); 
    //Serial.println(chk);
  }
  else {
    //Serial.print(DHT.humidity, 1);
    //Serial.print(",\t");
    //Serial.println(DHT.temperature, 1);
  }

  // --- PHOTO ---
  int photoval = analogRead(PHOTO_PIN);
  int potval = analogRead(POT_PIN);
  //Serial.print("PHOTO, \t");
  //Serial.println(photoval-potval);
  if (photoval-potval > 0) {
    blinkCount ++;
  }
  
  

  
  
  
  
/*  message[1] = (packageCount >> 8) & 0x0F;
  message[2] = packageCount & 0x0F;
  message[3] = (temp >> 8) & 0x0F;
  message[4] = temp & 0x0F;
  message[5] = (humid >> 8) & 0xF;
  message[6] = humid & 0x0F;
  message[7] = (blinkCount >> 8) & 0xF;
  message[8] = blinkCount & 0x0F;*/
  
  /*Serial.print("Recv: payload number ");
  Serial.print(packageCount);
  Serial.print(" from ");
  Serial.println(message[0]);
  Serial.print("temp: ");
  Serial.print(temp);
  Serial.print(" humid: ");
  Serial.print(humid);
  Serial.print(" blink: ");
  Serial.println(blinkCount);*/
  
  int16_t temp = (int) (DHT.temperature*100);
  int16_t humid = (int) (DHT.humidity*100);
  
  uint16_t* mcount = (uint16_t*) &message[1];
  int16_t* mtemp = (int16_t*) &message[3];
  int16_t* mhumid = (int16_t*) &message[5];
  uint16_t* mblink = (uint16_t*) &message[7];
  *mcount = packageCount;
  *mtemp = temp;
  *mhumid = humid;
  *mblink = blinkCount;
  
  // --- RADIO ---
  radio.write( message, sizeof(message));
  
  /*
    0    1    2    3    4    5    6    7    8     
  |----|----.----|----.----|----.----|----.----|
    ID    count     temp      humid     blink
  */
  uint8_t* sensorId2 = &message[0];
  uint16_t* packageCount2 = (uint16_t*) &message[1];
  int16_t* temp2 = (int16_t*) &message[3];
  int16_t* humid2 = (int16_t*) &message[5];
  uint16_t* blinkCount2 = (uint16_t*) &message[7];
  /*
  uint8_t sensorId2 = message[0];
  int16_t packageCount2 = (message[1] << 8) | message[2];
  int16_t temp2 = (message[3] << 8) | message[4];
  int16_t humid2 = (message[5] << 8) | message[6];
  int16_t blinkCount2 = (message[7] << 8) | message[8];
  */
    /*
  Serial.print("Recv: payload number ");
  Serial.print(*packageCount2);
  Serial.print(" from ");
  Serial.println(*sensorId2);
  Serial.print("temp: ");
  Serial.print(*temp2);
  Serial.print(" humid: ");
  Serial.print(*humid2);
  Serial.print(" blink: ");
  Serial.println(*blinkCount2);*/
  
  packageCount += 1;
  
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


